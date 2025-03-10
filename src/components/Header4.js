import React from 'react';
import {View, StyleSheet, Text } from 'react-native';
import IconBack from 'react-native-vector-icons/MaterialIcons';


export default function Header( props ) {
  return(
    <View style = {styles.header}>
      
      <View style = {styles.headerLeft} >
        <IconBack.Button 
          name = "arrow-back-ios"  
          size = {25}
          marginRight = {-10}
          borderRadius = {30}
          backgroundColor = "#150159" 
          onPress = {() => props.navigation.goBack()} 
        />
      </View>
      <Text style = {styles.headerName}>{props.screenName}</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  
  header : {
    backgroundColor: "#150159",
    flexDirection:'row',
    height: 70,
    width: "100%",
    justifyContent: 'flex-start'
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

  headerName: {
    marginLeft: "15%",
    color: "#fff",
    fontSize: 28,
    alignSelf: "center"
  }
});