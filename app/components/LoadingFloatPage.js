/**页面Loading组件**/

import React from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';

const LoadingFloatPage = ({
  style,
  loadingContainerStyle,
  content = '加载中',
}) => (
  <View style={[styles.loadingFloatPageContainer, style]}>
    <View style={[styles.loadingContainer, loadingContainerStyle]}>
      <ActivityIndicator style={styles.indicator} color="blue" size="large" />
      <Text style={styles.contentText}>{content}</Text>
    </View>
  </View>
);

const {screenWidth} = gSize;
const styles = StyleSheet.create({
  loadingFloatPageContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    width: screenWidth,
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)', //android不设置背景色会出现点透问题
  },
  loadingContainer: {
    width: screenWidth / 4,
    height: screenWidth / 4,
    backgroundColor: 'rgba(0,0,0,.16)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  indicator: {
    marginTop: Ios ? 4 : 0,
    marginLeft: Ios ? 4 : 0,
  },
  contentText: {
    marginTop: 5,
    color: '#fff',
    fontSize: 14,
    paddingTop: 5,
  },
});

export default LoadingFloatPage;
