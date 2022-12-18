/**弹窗输入组件**/
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {Overlay, Toast} from 'teaset';

const InputView = ({
  title = '',
  value = '',
  maxLength = 10,
  placeholder = '',
  keyboardType = 'default',
  autoFocus = true,
  confirmHandle = () => {},
  close,
  reg,
}) => {
  const [inputValue, setValue] = useState(value);
  return (
    <View style={styles.inputView}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        maxLength={maxLength}
        keyboardType={keyboardType}
        value={inputValue}
        autoFocus={autoFocus}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        onChangeText={text => {
          if (reg) {
            if (reg.test(text) || text === '') {
              setValue(text);
            }
          } else {
            setValue(text);
          }
        }}
        style={styles.input}
      />

      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={close}
          activeOpacity={1}
          style={[styles.alertButton, {borderWidth: 1, borderColor: '#ccc'}]}>
          <Text style={[styles.alertButtonText, {color: '#ccc'}]}>取消</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (inputValue.length === 0) {
              Toast.message('输入不能为空', '', 'top');
              return;
            }
            close();
            confirmHandle(inputValue);
          }}
          style={[styles.alertButton, {backgroundColor: 'blue'}]}>
          <Text style={styles.alertButtonText}>确认</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const InputOverlay = props => {
  let popView = null;
  let overlayView = (
    <Overlay.PopView
      type="zoomIn"
      ref={e => (popView = e)}
      style={{alignItems: 'center', justifyContent: 'center'}}>
      <InputView close={() => popView.close()} {...props} />
    </Overlay.PopView>
  );
  Overlay.show(overlayView);
};

const {screenWidth, pixel} = gSize;
const styles = StyleSheet.create({
  inputView: {
    backgroundColor: '#fff',
    width: screenWidth - 80,
    minHeight: 180,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 180,
  },
  title: {
    fontSize: 16,
    marginVertical: 20,
    color: '#333',
  },
  input: {
    padding: 0,
    paddingHorizontal: 5,
    width: '70%',
    height: 36,
    borderWidth: pixel,
    borderColor: '#999',
  },
  alertButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: (screenWidth - 80) / 3,
    height: 36,
    borderRadius: 18,
    marginHorizontal: 10,
    backgroundColor: '#fff',
  },
  alertButtonText: {
    fontSize: 14,
    color: '#fff',
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InputOverlay;
