/**进步器组件**/

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Touchable, InputOverlay} from './index';

export default function Stepper({value, onChange}) {
  const disableReduce = value === 1;
  const reduce = () => {
    onChange(value - 1);
  };
  const touchInput = () => {
    InputOverlay({
      title: '请输入数量',
      value: value + '',
      placeholder: '请输入数量',
      reg: /^[1-9]\d*$/,
      keyboardType: 'numeric',
      confirmHandle: text => {
        onChange(text / 1);
      },
    });
  };

  const add = () => {
    onChange(value + 1);
  };

  return (
    <View style={styles.container}>
      <Touchable
        disabled={disableReduce}
        style={[styles.btnContainer, {borderRightWidth: 1}]}
        onPress={reduce}>
        <Text
          style={[styles.btnText, {color: disableReduce ? '#ddd' : '#000'}]}>
          -
        </Text>
      </Touchable>

      <Touchable style={[styles.inputContainer]} onPress={touchInput}>
        <Text>{value}</Text>
      </Touchable>

      <Touchable
        style={[styles.btnContainer, {borderLeftWidth: 1}]}
        onPress={add}>
        <Text style={styles.btnText}>+</Text>
      </Touchable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minWidth: 100,
    height: 30,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  btnContainer: {
    width: 30,
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#aaa',
  },
  inputContainer: {
    minWidth: 40,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000',
    lineHeight: Ios ? 20 : undefined,
  },
});
