import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../buyerscreens/HomeScreen';
import VegContent from '../contents/VegContent';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <NavigationContainer independent = "true">
      <Stack.Navigator 
        initialRouteName = "Home"
        screenOptions = {{  headerShown: false  }}
        >
        
        <Stack.Screen name = "Home" component={HomeScreen} />
        <Stack.Screen name = "VegContent" component={VegContent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
