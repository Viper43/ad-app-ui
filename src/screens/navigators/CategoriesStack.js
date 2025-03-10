import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Content from '../../components/Content';
import CategoriesScreen from '../buyerscreens/CategoriesScreen';

const Stack = createStackNavigator();

export default function CategoriesStack() {
  return (
    <NavigationContainer independent = "true">
      <Stack.Navigator 
        initialRouteName = "Categories" 
        screenOptions = {{  headerShown: false  }}
				>
				
				<Stack.Screen name = "Categories" component={CategoriesScreen} />
        <Stack.Screen name = "Content" component={Content} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
