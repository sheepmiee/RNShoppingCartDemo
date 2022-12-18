import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'mobx-react';
import stores from '../mobx';
import {TopView} from 'teaset';
import ShoppingCart from '../containers/ShoppingCart';
import Home from '../containers/Home';
import GoodsDetail from '../containers/Home/GoodsDetail';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeTab = () => (
  <Tab.Navigator screenOptions={{headerTitleAlign: 'center'}}>
    <Tab.Screen name="HomeTab" component={Home} options={{title: '商品列表'}} />
    <Tab.Screen
      name="ShoppingCart"
      component={ShoppingCart}
      options={{title: '购物车'}}
    />
  </Tab.Navigator>
);

function AppRouter() {
  return (
    <TopView>
      <Provider {...stores}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTitleAlign: 'center',
              headerShadowVisible: false,
              animation: 'slide_from_right',
            }}>
            <Stack.Screen
              name="Home"
              component={HomeTab}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="GoodsDetail"
              component={GoodsDetail}
              options={{title: '商品详情'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </TopView>
  );
}

export default AppRouter;
