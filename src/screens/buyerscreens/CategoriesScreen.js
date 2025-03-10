import React from 'react';
import { StyleSheet, View } from "react-native";
import Category from '../../components/Category';
import Header from '../../components/Header';


export default function categoriesScreen( props ) {
  return(
    <View style = {styles.container}>
      <Header {...props}/>
      <Category {...props}/>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

});