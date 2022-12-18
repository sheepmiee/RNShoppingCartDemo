/**价格文字组件**/

import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default function PriceText({
  price,
  symbol = '$',
  style,
  symbolStyle = {},
}) {
  return (
    <Text style={[styles.price, style]}>
      <Text style={[{fontSize: 12}, symbolStyle]}>{symbol}</Text>
      {price}
    </Text>
  );
}

const styles = StyleSheet.create({
  price: {
    fontSize: 18,
    fontWeight: '500',
    color: 'red',
  },
});
