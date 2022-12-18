import React, {useState, useEffect} from 'react';
import {StatusBar, StyleSheet, View, FlatList} from 'react-native';
import {inject, observer} from 'mobx-react';
import {Api} from '../../api';
import httpUtils from '../../utils/httpUtils';
import GoodsItem from './GoodsItem';
import {ListFooter, LoadingFloatPage} from '../../components';

const Home = props => {
  const {navigation} = props;
  const [goodsList, setGoodsList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    httpUtils
      .post(Api.goodList)
      .then(res => {
        if (res.code === 200) {
          setGoodsList(res.goodsList);
          setLoading(false);
        }
      })
      .catch();
  }, []);

  //跳转到详情页
  const pushToGoodsDetail = goodsId => {
    navigation.push('GoodsDetail', {goodsId});
  };

  //加入购物车
  const addShoppingList = goodsItem => {
    props.ShoppingCartStore.addGoods(goodsItem);
  };

  //底部加载
  const onEndReached = () => {
    httpUtils
      .post(Api.goodList)
      .then(res => {
        if (res.code === 200) {
          setGoodsList(goodsList.concat(res.goodsList));
        }
      })
      .catch();
  };

  //脚部组件
  const renderFooter = () => {
    if (goodsList.length === 0) {
      return null;
    }
    return <ListFooter hasMoreData={true} />;
  };

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        translucent={true}
        backgroundColor="transparent"
        StatusBarAnimation="fade"
        barStyle="dark-content"
      />
      <FlatList
        style={{flex: 1}}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 20,
        }}
        data={goodsList}
        keyExtractor={(item, index) => index + ''}
        renderItem={props => (
          <GoodsItem
            addShoppingList={addShoppingList}
            navigation={navigation}
            pushToGoodsDetail={pushToGoodsDetail}
            {...props}
          />
        )}
        ListFooterComponent={renderFooter()}
        onEndReachedThreshold={0.01}
        onEndReached={onEndReached}
        showsVerticalScrollIndicator={false}
      />
      {loading ? <LoadingFloatPage /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default inject('ShoppingCartStore')(observer(Home));
