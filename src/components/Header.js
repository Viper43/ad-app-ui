import React from 'react'
import {View, StyleSheet, } from 'react-native';
import { Searchbar } from 'react-native-paper';
import IconMenu from 'react-native-vector-icons/Feather';
import IconProfile from 'react-native-vector-icons/EvilIcons';

export default function Header({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style = {styles.headerContainer}>
      <View style = {styles.headerIcons}>
        <View>
          <IconMenu.Button 
            name = "menu"  
            size = {35}
            marginRight = {-10}
            borderRadius = {35}
            //backgroundColor = "#38b000" 
            backgroundColor= "#150159"
            onPress = {() => navigation.openDrawer()} 
          />
        </View>

        <View>
          <IconProfile.Button 
            name = "user"  
            size = {42}
            marginRight = {-10}
            borderRadius = {42}
            //backgroundColor = "#38b000" 
            backgroundColor= "#150159"
            onPress = {() => navigation.navigate('Profile')} 
          />
        </View>
      </View>
      
      <View style = {styles.headerSearchBar}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style = {styles.searchBarStyle}
        />
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  
  searchBarStyle: {
    width: '95%',
    alignSelf: "center",
    height: "82%",
  },

  headerContainer: {
    height: 120,
    width: "100%",
    backgroundColor: "#150159",
    paddingVertical: 5,
  },

  headerIcons: {
    height: "50%",
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "#150159",
  },

  headerSearchBar: {
    height: "50%",
    backgroundColor: "#150159",
  },

});