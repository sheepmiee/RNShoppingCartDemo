import {Dimensions, StyleSheet, Platform} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
global.gSize = {
  screenWidth,
  screenHeight,
  pixel: StyleSheet.hairlineWidth,
};
global.Ios = Platform.OS === 'ios';
global.Android = Platform.OS === 'android';
