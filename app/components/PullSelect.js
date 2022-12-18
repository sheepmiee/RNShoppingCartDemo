/**上拉选择组件**/

import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Touchable} from './index';
import {Overlay} from 'teaset';

const MyCheckBox = ({checked}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 2,
        backgroundColor: checked ? 'blue' : '#fff',
        borderColor: checked ? 'blue' : '#ddd',
      }}
    />
  );
};

const PullSelectView = props => {
  const {title, selectedKey, selectedCode, items, getItemName} = props;
  const onItemPress = (selectedItem, index) => {
    const {onSelected, close} = props;
    onSelected(selectedItem, index);
    close();
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.containerTitle}>{title}</Text>
      </View>
      <ScrollView
        contentContainerStyle={{alignItems: 'center', paddingBottom: 40}}
        style={{backgroundColor: '#fff', flexGrow: 1}}>
        {items && items.length ? (
          items.map((item, index) => {
            let checked = item[selectedKey] === selectedCode;
            return (
              <Touchable
                onPress={() => onItemPress(item, index)}
                key={index + ''}
                style={styles.itemContainer}>
                <MyCheckBox checked={checked} />
                <View style={{flex: 1, marginLeft: 10}}>
                  <Text
                    style={{
                      color: checked ? 'blue' : '#333',
                      fontWeight: checked ? 'bold' : 'normal',
                      fontSize: 16,
                      lineHeight: 18,
                    }}>
                    {getItemName(item)}
                  </Text>
                </View>
              </Touchable>
            );
          })
        ) : (
          <View style={{width: screenWidth}}>
            <Text style={styles.noDataText}>暂无数据</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const PullSelect = ({
  title = '请选择',
  items = [],
  getItemName = item => item.name,
  selectedKey = 'code',
  selectedCode = '',
  onSelected = () => {},
}) => {
  let pullView = null;
  let overlayView = (
    <Overlay.PullView
      side="bottom"
      ref={e => (pullView = e)}
      containerStyle={{borderTopLeftRadius: 15, borderTopRightRadius: 15}}
      style={{alignItems: 'center', justifyContent: 'flex-end'}}>
      <PullSelectView
        close={() => pullView.close()}
        title={title}
        items={items}
        getItemName={getItemName}
        selectedKey={selectedKey}
        selectedCode={selectedCode}
        onSelected={onSelected}
      />
    </Overlay.PullView>
  );
  Overlay.show(overlayView);
};

export default PullSelect;

const {screenWidth, screenHeight, pixel} = gSize;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    maxHeight: screenHeight / 1.5,
    minHeight: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
  },
  headerContainer: {
    width: screenWidth - 20,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: pixel,
    borderColor: '#ddd',
  },
  containerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  itemContainer: {
    width: screenWidth - 20,
    minHeight: 60,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: pixel,
    borderColor: '#ccc',
  },
  noDataText: {
    color: '#aaa',
    marginTop: 20,
    marginLeft: 10,
    fontSize: 18,
  },
});
