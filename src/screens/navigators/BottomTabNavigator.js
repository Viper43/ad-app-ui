import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ProfileScreen from '../buyerscreens/ProfileScreen';
import NotificationScreen from '../buyerscreens/NotificationScreen';
import HomeScreen from '../buyerscreens/HomeScreen';
import MyCart from '../buyerscreens/MyCart';
import CategoriesScreen from '../buyerscreens/CategoriesScreen';


const Tab = createMaterialBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor= '#ffffff'
      backBehavior="history"
      barStyle={{ backgroundColor: '#ff0a54',  }}
      >
      <Tab.Screen
        name = "Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      
      <Tab.Screen
        name = "Categories" 
        component={CategoriesScreen}
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-module" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name = "Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name = "Notifications" 
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Cart"
        component={MyCart}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart" color={color} size={26} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}    