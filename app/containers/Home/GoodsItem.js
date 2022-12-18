import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Toast} from 'teaset';
import {
  Button,
  Touchable,
  PullSelect,
  Stepper,
  PriceText,
} from '../../components';

export default function GoodsItem({
  item,
  index,
  addShoppingList,
  pushToGoodsDetail,
}) {
  const {name, des, formatList, imgUrl} = item;
  const [count, setCount] = useState(1);
  const [format, setFormat] = useState(formatList[0]);

  //加入购物车
  const addGoods = () => {
    if (!count) {
      Toast.message('请输入数量', 'long', 'center');
      return;
    }
    let goodsInfoItem = {
      goodsId: index,
      name: name + index,
      des,
      imgUrl,
      format: {...format, count: count / 1},
    };
    addShoppingList(goodsInfoItem);
  };

  //选择规格
  const selectFormat = () => {
    PullSelect({
      title: '请选择规格',
      items: formatList,
      selectedKey: 'formatId',
      selectedCode: format.formatId,
      getItemName: ({formatName}) => formatName,
      onSelected: selectedItem => {
        setFormat(selectedItem);
      },
    });
  };

  return (
    <Touchable onPress={() => pushToGoodsDetail(index)} style={styles.item}>
      <Image style={styles.image} source={{uri: imgUrl}} />
      <Text style={styles.title}>{name + index}</Text>
      <Text style={styles.description}>{des}</Text>
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

      <View style={styles.Separator} />

      <View style={styles.rowContainer}>
        <PriceText price={format.price} />
        <Button style={styles.button} title="加入购物车" onPress={addGoods} />
      </View>
    </Touchable>
  );
}

const {screenWidth, pixel} = gSize;
const itemWidth = screenWidth - 30;
const itemInnerWidth = itemWidth - 40;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  item: {
    width: itemWidth,
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
  },
  inputContainer: {
    width: 60,
    height: 30,
    borderWidth: pixel,
    borderColor: '#aaa',
    borderRadius: 4,
  },
  input: {
    width: 60,
    height: 30,
    paddingLeft: 10,
  },
  image: {
    width: itemInnerWidth,
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    color: '#000',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    color: '#666',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: itemInnerWidth,
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
  Separator: {
    width: itemInnerWidth,
    height: pixel,
    backgroundColor: '#ccc',
    marginTop: 15,
  },
  button: {
    width: 150,
  },
  lightText: {
    color: '#aaa',
    fontSize: 12,
    lineHeight: 20,
  },
});
