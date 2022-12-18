import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import {Toast} from 'teaset';
import httpUtils from '../../utils/httpUtils';
import {Api} from '../../api';
import {
  Button,
  LoadingFloatPage,
  PriceText,
  PullSelect,
  Stepper,
  Touchable,
} from '../../components';

function GoodsDetail(props) {
  const {goodsId} = props.route.params;
  const [goodsInfo, setGoodsInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [format, setFormat] = useState({});

  useEffect(() => {
    httpUtils
      .post(Api.goodsDetail, {goodsId})
      .then(res => {
        if (res.code === 200 && res.data) {
          setGoodsInfo(res.data);
          setFormat(res.data.formatList[0]);
          setLoading(false);
        }
      })
      .catch();
  }, []);

  //加入购物车
  const addGoods = () => {
    if (!count) {
      Toast.message('请输入数量', 'long', 'center');
      return;
    }
    const {name, des, imgUrl} = goodsInfo;
    let goodsInfoItem = {
      goodsId,
      name: name + goodsId,
      des,
      imgUrl,
      format: {...format, count: count / 1},
    };
    props.ShoppingCartStore.addGoods(goodsInfoItem);
  };

  //选择规格
  const selectFormat = () => {
    PullSelect({
      title: '请选择规格',
      items: goodsInfo.formatList,
      selectedKey: 'formatId',
      selectedCode: format.formatId,
      getItemName: ({formatName}) => formatName,
      onSelected: selectedItem => {
        setFormat(selectedItem);
      },
    });
  };

  //底部View渲染
  const renderBottom = () => {
    return (
      <View style={styles.bottomContainer}>
        <View style={styles.rowContainer}>
          <View>
            <Text style={styles.lightText}>数量</Text>
            <Stepper
              value={count}
              onChange={value => {
                setCount(value);
              }}
            />
          </View>
          <View>
            <Text style={styles.lightText}>规格</Text>
            <Touchable onPress={selectFormat} style={styles.formatView}>
              <Text style={styles.formatText}>{format.formatName}</Text>
            </Touchable>
          </View>
        </View>
        <View>
          <Button style={styles.button} title="加入购物车" onPress={addGoods} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {goodsInfo ? (
        <View style={{flex: 1, alignItems: 'center'}}>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{width: innerContainerWidth}}>
            <Image style={styles.image} source={{uri: goodsInfo.imgUrl}} />
            <PriceText price={format.price} style={styles.price} />
            <Text style={styles.title}>{goodsInfo.name + goodsId}</Text>
            <Text style={styles.description}>{goodsInfo.des}</Text>
          </ScrollView>
          {renderBottom()}
        </View>
      ) : null}
      {loading ? <LoadingFloatPage /> : null}
    </View>
  );
}

const {screenWidth, pixel} = gSize;
const innerContainerWidth = screenWidth - 60;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 25,
  },
  image: {
    width: innerContainerWidth,
    height: 200,
    borderRadius: 8,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 15,
    color: '#000',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    color: '#666',
  },
  price: {
    fontSize: 24,
    marginTop: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: innerContainerWidth,
    alignItems: 'center',
    marginTop: 15,
  },
  formatView: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  formatText: {
    color: '#666',
  },
  button: {
    width: innerContainerWidth,
    height: 40,
    marginTop: 15,
  },
  lightText: {
    color: '#aaa',
    fontSize: 12,
    lineHeight: 20,
  },
  bottomContainer: {
    width: screenWidth,
    borderTopWidth: pixel,
    borderColor: '#ccc',
    alignItems: 'center',
  },
});

export default inject('ShoppingCartStore')(observer(GoodsDetail));
