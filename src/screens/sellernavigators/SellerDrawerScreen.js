import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import SellerHomeScreen from '../sellerscreens/SellerHomeScreen';
import SellerProfileScreen from '../sellerscreens/SellerProfileScreen';
import SellerProduct from '../../components/SellerProduct';
import AddProduct from '../sellerscreens/AddProduct';
import EditProduct from '../sellerscreens/EditProduct';
import SellerDrawerContent from './SellerDrawerContent';
import SellerNotificationScreen from '../sellerscreens/SellerNotificationScreen'
import App from '../../../App';

const SellerDrawer = createDrawerNavigator();

export default function SellerDrawerScreen() {
  return(
    <NavigationContainer independent = {true}>
      <SellerDrawer.Navigator backBehavior = "history" initialRouteName = "SellerHome" drawerContent = {props => <SellerDrawerContent {...props}/>}>
        <SellerDrawer.Screen name = "SellerHome" component = {SellerHomeScreen}/>
        <SellerDrawer.Screen name = "Profile" component = {SellerProfileScreen}/>
        <SellerDrawer.Screen name = "SellerProduct" component = {SellerProduct}/>
        {/* <SellerDrawer.Screen name = "SellerNotification" component = {SellerNotificationScreen}/> */}
        <SellerDrawer.Screen name = "AddProduct" component = {AddProduct}/>
        <SellerDrawer.Screen name = "EditProduct" component = {EditProduct}/>
        <SellerDrawer.Screen name = "App" component={App} />
      </SellerDrawer.Navigator>
    </NavigationContainer>
  );
}

