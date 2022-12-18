/**列表脚部组件**/
import React from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';

const NoMoreData = ({content = '我是有底线的', style = {}}) => (
  <View style={[styles.noMoreView, style]}>
    <View style={styles.line} />
    <Text style={styles.noMoreTitle}>{content}</Text>
    <View style={styles.line} />
  </View>
);

const LoadingFooter = props => (
  <View style={[styles.loadingMore, props.style]}>
    <ActivityIndicator color="#9a9a9a" size="small" />
    <Text style={styles.loadingMoreTitle}>正在加载...</Text>
  </View>
);

const ListFooter = ({style = {}, hasMoreData = false}) => {
  return hasMoreData ? (
    <LoadingFooter style={style} />
  ) : (
    <NoMoreData style={style} />
  );
};

const {screenWidth, pixel} = gSize;
const styles = StyleSheet.create({
  loadingMore: {
    width: screenWidth,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadingMoreTitle: {
    fontSize: 14,
    color: '#9a9a9a',
    marginLeft: 15,
  },
  noMoreView: {
    flexDirection: 'row',
    width: screenWidth,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMoreTitle: {
    fontSize: 14,
    color: '#9a9a9a',
    marginHorizontal: 10,
  },
  line: {
    backgroundColor: '#bbb',
    height: pixel,
    width: 80,
  },
});

export default ListFooter;
