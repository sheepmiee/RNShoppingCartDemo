import {makeAutoObservable} from 'mobx';
import {Toast} from 'teaset';

class ShoppingCartStore {
  constructor() {
    makeAutoObservable(this);
  }

  /**
   * shoppingCartList 购物车列表数据格式：
   {
    goodsId: 1,
    name: "绿联typec数据线",
    des: "高品质数据线，支持5a大电流充电",
    formatList: [{
        formatId: "f1",
        formatName: "type-c编织款 白色 1m",
        price: 10,
        count: 1
        }]
    }
   **/
  shoppingCartList = [];

  //折扣码
  promoCode = '';

  //是否已使用折扣
  usePromoCode = false;

  //折扣减去的金额
  promoPrice = 0;

  //计算不包含折扣的总金额
  get totalPrice() {
    return this.shoppingCartList.reduce((pre, cur) => {
      return pre + cur.formatList.reduce((innerPre, innerCur) => innerPre + (innerCur.price * innerCur.count), 0);
    }, 0);
  }

  //加入购物车
  addGoods(goodsItem) {
    const {goodsId, name, des, format, imgUrl} = goodsItem;
    const listCopy = JSON.parse(JSON.stringify(this.shoppingCartList));

    const hasGoods = listCopy.some(shoppingCartItem => {
      if (shoppingCartItem.goodsId === goodsId) {
        const hasFormat = shoppingCartItem.formatList.some(formatItem => {
          if (formatItem.formatId === format.formatId) {
            formatItem.count = formatItem.count + format.count;
            return true;
          }
        });
        if (!hasFormat) {
          shoppingCartItem.formatList.unshift(format);
        }
        return true;
      }
    });
    if (!hasGoods) {
      listCopy.unshift({goodsId, name, des, imgUrl, formatList: [format]});
    }

    this.shoppingCartList = listCopy;
    Toast.message('添加成功', 'short', 'center');
  }

  //删除商品
  deleteGoods({goodsId, formatId}) {
    this.shoppingCartList.find((item, index) => {
      if (goodsId === item.goodsId) {
        item.formatList = item.formatList.filter(
          formatItem => formatItem.formatId !== formatId,
        );

        if (item.formatList.length === 0) {
          this.shoppingCartList.splice(index, 1);
        }
        return true;
      }
    });
  }

  //修改数量
  changeCount({goodsId, formatId, count}) {
    const listCopy = JSON.parse(JSON.stringify(this.shoppingCartList));
    listCopy.find(item => {
      if (goodsId === item.goodsId) {
        item.formatList.find(formatItem => {
          if (formatId === formatItem.formatId) {
            formatItem.count = count;
            return true;
          }
        });
        return true;
      }
    });

    this.shoppingCartList = listCopy;
  }

  //检查折扣
  checkPromoCode(text) {
    if (text === '111') {
      this.promoCode = text;
      this.usePromoCode = true;
      this.promoPrice = 5;
      Toast.success('折扣码使用成功');
      return;
    }
    if (text === 'HelloWorld') {
      this.promoCode = text;
      this.usePromoCode = true;
      this.promoPrice = 10;
      Toast.success('折扣码使用成功');
      return;
    }
    Toast.fail('无效的折扣码');
  }
}

export default new ShoppingCartStore();
