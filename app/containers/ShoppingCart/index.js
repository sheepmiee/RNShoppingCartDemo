import React from 'react';
import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import {inject, observer} from 'mobx-react';
import {
  Stepper,
  Touchable,
  Button,
  InputOverlay,
  PriceText,
} from '../../components';

const ShoppingCart = props => {
  const {shoppingCartList, totalPrice, promoPrice, promoCode, usePromoCode} = props.ShoppingCartStore;
  const {navigation} = props;

  //跳转到商品详情页
  const pushToGoodsDetail = goodsId => {
    navigation.push('GoodsDetail', {goodsId});
  };

  //输入折扣码
  const inputPromoCode = () => {
    InputOverlay({
      title: '请输入折扣码',
      value: promoCode,
      placeholder: '',
      confirmHandle: text => {
        props.ShoppingCartStore.checkPromoCode(text);
      },
    });
  };

  //删除商品
  const deleteGoods = ({goodsId, formatId}) => {
    props.ShoppingCartStore.deleteGoods({goodsId, formatId});
  };

  //修改商品数量
  const onCountChange = ({goodsId, formatId, value}) => {
    props.ShoppingCartStore.changeCount({
      goodsId,
      formatId,
      count: value,
    });
  };

  //无商品时页面
  const renderEmptyView = () => {
    return shoppingCartList.length ? null : (
      <Text style={styles.emptyText}>购物车空空如也～</Text>
    );
  };

  //底部结账模块
  const renderCheckoutView = () => {
    return shoppingCartList.length ? (
      <View style={styles.checkOutContainer}>
        <View>
          <Text>
            合计：
            {usePromoCode ? (
              <PriceText
                style={{
                  color: '#ccc',
                  textDecorationLine: 'line-through',
                }}
                price={totalPrice + ' '}
              />
            ) : null}
            <PriceText price={totalPrice - promoPrice} />
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            {usePromoCode ? (
              <Text style={{fontSize: 12, lineHeight: 16, color: '#999'}}>
                优惠减:${promoPrice}
              </Text>
            ) : null}
            <Touchable style={styles.promoContainer} onPress={inputPromoCode}>
              <Text style={styles.promoText}>
                {usePromoCode ? '换个折扣' : '使用折扣'}
              </Text>
            </Touchable>
          </View>
        </View>

        <Button
          style={styles.button}
          textStyle={styles.btnText}
          title={'结算'}
        />
      </View>
    ) : null;
  };

  //渲染商品项
  const renderItem = ({item}) => {
    const {goodsId, name: goodsName, imgUrl, formatList} = item;
    return (
      <View style={styles.itemContainer} key={goodsId}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{goodsName}</Text>
        </View>
        {formatList.map(formatItem => (
          <FormatItem
            key={formatItem.formatId}
            goodsId={goodsId}
            imgUrl={imgUrl}
            {...formatItem}
          />
        ))}
      </View>
    );
  };

  //单个规格商品
  const FormatItem = ({
    goodsId,
    imgUrl,
    formatId,
    formatName,
    price,
    count,
  }) => {
    return (
      <Touchable
        activeOpacity={0.8}
        onPress={() => pushToGoodsDetail(goodsId)}
        style={styles.formatContainer}>
        <Image style={styles.image} source={{uri: imgUrl}} />
        <View style={styles.formatInfoContainer}>
          <View style={styles.formatTextContainer}>
            <Text style={styles.formatName}>{formatName}</Text>
            <Touchable onPress={() => deleteGoods({goodsId, formatId})}>
              <Text style={{color: 'red'}}>删除</Text>
            </Touchable>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              <Text style={{fontSize: 12}}>$</Text>
              {price}
            </Text>
            <Stepper
              value={count}
              onChange={value => onCountChange({value, goodsId, formatId})}
            />
          </View>
        </View>
      </Touchable>
    );
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      {renderEmptyView()}
      <FlatList
        style={{flex: 1}}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 20,
        }}
        data={shoppingCartList}
        keyExtractor={({goodsId}) => goodsId}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      {renderCheckoutView()}
    </View>
  );
};

const {screenWidth, pixel} = gSize;
const itemWidth = screenWidth - 30;
const styles = StyleSheet.create({
  emptyText: {
    marginTop: 200,
    color: '#aaa',
    fontWeight: '300',
  },
  itemContainer: {
    width: itemWidth,
    marginTop: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderRadius: 8,
  },
  titleContainer: {
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: pixel,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  formatContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 8,
  },
  formatInfoContainer: {
    flex: 1,
    height: 70,
    justifyContent: 'space-between',
  },
  formatTextContainer: {
    flexDirection: 'row',
  },
  formatName: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    fontWeight: '300',
    marginRight: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkOutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screenWidth,
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: pixel,
    borderColor: '#eee',
  },
  button: {
    backgroundColor: 'red',
    width: 100,
  },
  btnText: {
    fontSize: 15,
    fontWeight: '600',
  },
  promoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 16,
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 10,
    borderColor: '#2e7df6',
  },
  promoText: {
    color: '#2e7df6',
    fontSize: 10,
  },
});

export default inject('ShoppingCartStore')(observer(ShoppingCart));
