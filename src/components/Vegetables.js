import React from 'react';
import {View, Text,Image, StyleSheet} from 'react-native';

function logo() {
  return(
    <View style={styles.container} >
      <Image style={{width:100, height:100}}  
        source={require('../images/Logo.jpg')}/>
    </View>
  );
}

export default logo;

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});