/**按钮组件**/

import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Touchable from './Touchable';

export const Button = ({title, children, style, textStyle, ...rest}) => (
  <Touchable style={[styles.button, style]} {...rest}>
    <Text style={[styles.title, textStyle]}>{title || children}</Text>
  </Touchable>
);

const styles = StyleSheet.create({
  button: {
    minWidth: 55,
    height: 30,
    paddingHorizontal: 15,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef732f',
  },
  title: {
    fontSize: 12,
    color: '#fff',
  },
});

export default Button;
