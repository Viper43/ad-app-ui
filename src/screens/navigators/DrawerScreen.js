import * as React from 'react';
import { createDrawerNavigator, } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import SettingsScreen from '../buyerscreens/SettingsScreen';
import BottomTabNavigator from './BottomTabNavigator';
import WishList from '../buyerscreens/WishList';
import DrawerContent from './DrawerContent';
import Product from '../../components/Product';
import ContentScreen from '../buyerscreens/ContentScreen';
import App from '../../../App';

const Drawer = createDrawerNavigator();

export default function DrawerScreen() {
  return (
    <NavigationContainer independent = "true" >
      <Drawer.Navigator backBehavior="history" drawerContent = {props => <DrawerContent {...props}/>}>
        <Drawer.Screen name = "HomeStack" component={BottomTabNavigator} />
        <Drawer.Screen name = "Wishlist" component={WishList} />
        <Drawer.Screen name = "SettingsScreen" component={SettingsScreen} />
        <Drawer.Screen name = "ContentScreen" component={ContentScreen} />
        <Drawer.Screen name = "Product" component={Product} />
        <Drawer.Screen name = "App" component={App} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}



