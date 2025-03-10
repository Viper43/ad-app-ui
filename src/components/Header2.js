import React from 'react';
import {View, StyleSheet, } from 'react-native';
import IconBack from 'react-native-vector-icons/MaterialIcons';
import IconCart from 'react-native-vector-icons/Ionicons';

export default function Header({ navigation }) {
  return(
    <View style = {styles.header}>
      
      <View style = {styles.headerLeft} >
        <IconBack.Button 
          name = "arrow-back-ios"  
          size = {30}
          marginRight = {-10}
          borderRadius = {30}
          backgroundColor = "#150159" 
          onPress = {() => navigation.goBack()} 
        />

      </View>
      
      <View style = {styles.headerRight} >
        
        <IconCart.Button 
          name = "cart-outline"  
          size = {36}
          marginRight = {-10}
          borderRadius = {30}
          backgroundColor = "#150159" 
          onPress = {() => navigation.navigate('Cart')} 
        />
      </View>  
    </View>
  );
}

const styles = StyleSheet.create({
  
  header : {
    backgroundColor: "#150159",
    flexDirection:'row',
    height: 70,
    width: "100%",
    justifyContent: 'space-between'
  },

  headerLeft : { 
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center"
  },

  headerRight : {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15
  },

});