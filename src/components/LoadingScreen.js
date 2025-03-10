import React, { useEffect } from 'react';
import {View, StyleSheet, Image, Text, Alert} from 'react-native';
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from '@react-native-community/async-storage';

const getValueFunction = async ( props ) => {
  try {
    const jsonvalue  = await AsyncStorage.getItem('isLoggedIn');
    const value = JSON.parse(jsonvalue);
    
    if( value == null ) {
      
      props.navigation.navigate('LoginPin');  
    }
    else {
      if( value.utype == "Buyer" ) {
        props.navigation.navigate('DrawerScreen');
      }
      else {
        props.navigation.navigate('SellerDrawerScreen');
      }
    }
  }
  catch(e) {
    e.message();
  }
};




export default function LoadingScreen( props ) {
  
  useEffect(() => {
    setTimeout(() => {
      getValueFunction( props );
    }, 1000);
  }, [])  

  return(
    <View style = {styles.container}>
       <Image style={{width:170, height:100}}  
        source={require('../images/Logo.png')}/>

      <Text style={styles.logoText} >Welcome to my application</Text>
      
      <ActivityIndicator size="small" color="#00ff00" />
      
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: "#455a64",
    justifyContent: "center",
    alignItems: "center",
  },

  logoText : {
    fontSize: 20,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 40,
  }
})