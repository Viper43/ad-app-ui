import React from 'react';
import { View, StyleSheet, TouchableRipple, Text, Switch, TouchableOpacity, Alert} from "react-native";
import { Drawer } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import IconSignout from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

const toggleTheme = () => {

}

logout = async (props) => {
  try {
    await AsyncStorage.removeItem('isLoggedIn');
    //props.navigation.dangerouslyGetParent();
    props.navigation.navigate('App', { screen: 'LoadingScreen' });
  }
  catch(error) {
    Alert.alert(error.message);
  }
}

export default function DrawerContent( props ) {
	
  return (
		<View style = {styles.container}>
			<DrawerContentScrollView {...props}>
				<Drawer.Section>
					<DrawerItem
						label = "Home"
						onPress = {() => {props.navigation.navigate('Home')}}
					/>
          
					<DrawerItem
						label = "Profile"
						onPress = {() => {props.navigation.navigate('Profile')}}
					/>
          
					<DrawerItem
						label = "All Categories"
						onPress = {() => {props.navigation.navigate('Categories')}}
					/>

					<DrawerItem
						label = "My Cart"
						onPress = {() => {props.navigation.navigate('Cart')}}
					/>

					<DrawerItem
						label = "My Wishlist"
						onPress = {() => {props.navigation.navigate('Wishlist')}}
					/>
					
					<DrawerItem
						label = "Notifications"
						onPress = {() => {props.navigation.navigate('Notifications')}}
					/>
					
					<DrawerItem
						label = "Settings"
						onPress = {() => {props.navigation.navigate('SettingsScreen')}}
					/> 
				</Drawer.Section>
        
        <Drawer.Section title = "Preferences">
          <TouchableOpacity onPress={() => {toggleTheme()}}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch />
              </View>
            </View>
          </TouchableOpacity>  
        </Drawer.Section>

			</DrawerContentScrollView>
      
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem 
          icon = {() => (
            <IconSignout
              name = "exit-to-app"
              size = {25}
            />
          )}
          label = "Sign Out"
          onPress = {() => logout(props)}
        />
      </Drawer.Section>
		</View>
	)
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  bottomDrawerSection: {
    alignContent: "center",
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },

  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});