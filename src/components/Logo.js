import React from 'react';
import {View, Text,Image, StyleSheet} from 'react-native';

function logo() {
  return(
    <View style={styles.container} >

      <Image style={{width:170, height:100}}  
        source={require('../images/Logo.png')}/>

      <Text style={styles.logoText} >Welcome to my application</Text>

    </View>
  );
}

export default logo;

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    
    logoText : {
      fontSize: 20,
      color: "rgba(255, 255, 255, 0.7)",
  }
});