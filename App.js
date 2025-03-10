import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BuyerRegisterForm from './src/screens/register/BuyerRegisterForm';
import SellerRegisterForm from './src/screens/register/SellerRegisterForm';
import SelectorScreen from './src/screens/register/SelectorScreen';

import LoginPin from './src/screens/login/LoginPin';
import LoginPass from './src/screens/login/LoginPass';

import DrawerScreen from './src/screens/navigators/DrawerScreen';
import OtpScreen from './src/screens/otp/OtpScreen';
import SellerDrawerScreen from './src/screens/sellernavigators/SellerDrawerScreen';
import LoadingScreen from './src/components/LoadingScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent = "true">
      <Stack.Navigator initialRouteName = "LoadingScreen" screenOptions = {{  headerShown: false  }}>
        <Stack.Screen name = "LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name = "SelectorScreen" component={SelectorScreen} />
        <Stack.Screen name = "BuyerRegister" component={BuyerRegisterForm} />
        <Stack.Screen name = "SellerRegister" component={SellerRegisterForm} />
        <Stack.Screen name = "OtpScreen" component={OtpScreen} />
        <Stack.Screen name = "LoginPin" component={LoginPin} />
        <Stack.Screen name = "LoginPass" component={LoginPass} />
        <Stack.Screen name = "DrawerScreen" component={DrawerScreen} />
        <Stack.Screen name = "SellerDrawerScreen" component={SellerDrawerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}