import React, {useEffect, useState} from 'react';
import {View,  StyleSheet, Text, Image, FlatList, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../components/Header2';


wishListConnect = async (setWishList) => {

  const url = "http://10.0.2.2:8080/wishlist";
  try {

    const jsonvalue  = await AsyncStorage.getItem('isLoggedIn');
    const value = JSON.parse(jsonvalue);

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({pNo: value.phone}),
      headers: {
        "Content-Type": "application/json"
      }
    });    
    if( response.status != 200 ) {
      throw new Error("Something went wrong");
    }
    var datalist = await response.json();
    setWishList({ wishList: datalist})
  }
  catch(error) {
    Alert.alert(error.message);
  }
}

removeFromWishlist = async (prodId) => {
  
  const url = "http://10.0.2.2:8080/removeFromWishlist";
  
  try {

    const jsonvalue  = await AsyncStorage.getItem('isLoggedIn');
    const value = JSON.parse(jsonvalue);

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({id: prodId, pNo: value.phone}),
      headers: {
        "Content-Type": "application/json"
      }
    });    
    if( response.status != 200 ) {
      throw new Error("Something went wrong");
    }
    
  }
  catch(error) {
    Alert.alert(error.message);
  }
}

const numColumns = 1

export default function WishList( props ){

  var [wishlist, setWishList] = useState({ wishList: []})

  useEffect(() => {
    wishListConnect( setWishList)
  }, [wishlist.wishList])

  return (
    <View style = {styles.listContainer}>

      <Header {...props} />
      
      <FlatList
        numColumns = {numColumns}
        keyExtractor = {(item, index) => index.toString()}
        data = {wishlist.wishList}
        renderItem = {({item}) => {
          return ( 
            <View style = {styles.itemBox}>
              <TouchableOpacity style = {styles.imageButton} onPress = {() => props.navigation.navigate('Product', item)}>
                <Image source = {{uri: item.ProductImage }}
                  style = {styles.cardImage}
                resizeMode = "stretch"
                />
              </TouchableOpacity>
              <View style = {styles.contentDetails}>
                <Text style={styles.itemDetails}>{item.ProductName}</Text>
                
                <View style = {styles.priceandAdd}>
                  <View>
                    <Text>{item.ActualPrice}</Text>
                    <Text>{item.DiscountedPrice}</Text>
                  </View>
                  
                  <View>
                    <TouchableOpacity style = {styles.deleteButton} onPress = {() => removeFromWishlist(item.ProductId)}>
                      <Text style = {styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            </View>
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  listContainer: {
    flexShrink: 1,
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 5,
    borderRadius: 8,
  },
  
  itemBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 120,
    padding: 15,
    margin: 0,
    elevation: 5,
    borderWidth: 0.2,
  
  },

  imageButton: {
    flex: 1,
  },

  contentDetails: {
    flex: 2,
    paddingLeft: 15,
    paddingRight: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  priceandAdd: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  cardImage: { 
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },

  addButton: {
    width: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#e76f51'
  },

  itemDetails: {
    fontSize: 18,
  },

  deleteButton: {
    //backgroundColor: "#84c225",
    backgroundColor: "#ff0a54",
    paddingHorizontal: 35,
    paddingVertical: 6,
    borderRadius: 3,
  },

  deleteButtonText: {
    fontSize: 20,
    color: "#ffffff",
  }
});
