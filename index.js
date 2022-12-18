/**
 * @format
 */

import {AppRegistry} from 'react-native';
import './app/global';
import App from './app/index';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
