import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Dimensions, Text, FlatList, SafeAreaView, Alert} from 'react-native';


categoryConnect = async (setCategory) => {

  const url = "http://10.0.2.2:8080/categories";

  try {
    const response = await fetch(url);    
    if( response.status != 200 ) {
      throw new Error("Something went wrong");
    }
    const datalist = await response.json();
    setCategory({ categoryList: datalist})

  }
  catch(error) {
    Alert.alert(error.message);
  }
}

const numColumn = (dataList) => {

  if( dataList.length == 6 ) {
    return 3;
  }
  else {
    return 2;
  }
}

formData = (dataList, numColumns) => {

  const totalRows = Math.floor(dataList.length / numColumns)
  let totalLastRow = dataList.length - (totalRows * numColumns)

  while ( totalLastRow !== 0 && totalLastRow !== numColumns ) {
    dataList.push({key: 'blank', empty: true})
    totalLastRow++
  }
  return dataList
}

export default function Category( props, {navigation} ) {
  const [category, setCategory] = useState({ categoryList: []})
  useEffect(() => {
    categoryConnect(setCategory)
  }, [])

  return (
    <SafeAreaView style = {styles.container}>
      <View style = {styles.listContainer}>
        <Text style = {styles.headerText}>SHOP BY CATEGORY</Text>
        
        <FlatList
          scrollEnabled={false}
          numColumns = {numColumn(category.categoryList)}
          data = {formData(category.categoryList, numColumn(category.categoryList))}
          keyExtractor = {(item, index) => index.toString()}
          renderItem = {({item} ) => {  
            if( item.empty ) {
              return ( 
                <View style = {styles.invisibleView}></View>
              )
            }          
          return ( 
            <View style = {styles.itemBox}>
              <TouchableOpacity style = {styles.imageButton} onPress = {() => props.navigation.navigate('ContentScreen', item)}>
                <Image source = {{ uri: item.CategoryImage}}
                  style = {styles.cardImage}
                  resizeMode = "cover"
                  width = {Dimensions.get('screen').width / numColumn(category.categoryList)}
                />
              </TouchableOpacity>
            </View>)
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5'
  },

  listContainer: {
    flexShrink: 1,
    backgroundColor: '#fff',
    overflow: 'hidden',
    width: '95%',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 5,
    borderRadius: 2,
  },
  
  itemBox: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#fff',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
    borderWidth: 0.5,
    borderColor: '#ccd5ae',
  },

  imageButton: {
    flex: 1
  },

  cardImage: { 
    flex: 1,
    backgroundColor: "#fff",
    height: '100%',
    width: '100%',
  },

  invisibleView: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#fff',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,    
    backgroundColor: 'transparent'
  },

  headerText: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'sans-serif-medium',
    padding: 10,
    borderWidth: 0.2,
    backgroundColor: '#84c225'
  },
});
