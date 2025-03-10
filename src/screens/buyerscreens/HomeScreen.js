import React, {useEffect} from 'react';
import Swiper from 'react-native-swiper';
import {View, StyleSheet, Image, Text, SafeAreaView, ScrollView, StatusBar, BackHandler, Alert } from 'react-native';
import Category from '../../components/Category';
import Header from '../../components/Header';

adList = [
  {key: '1', image: require('../../images/FruitAd.jpg')},
  {key: '2', image: require('../../images/GroceriesAd.jpg')},
  {key: '3', image: require('../../images/VegetablesAd.jpg')},
  {key: '4', image: require('../../images/MeatandFishAd.jpg')},
]

export default function HomeScreen( props ) {
  
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
        {
          text: "Cancel",
          onPress: () => null
        },
        { text: "Yes", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  return (
    <SafeAreaView style = {styles.container}>
      <StatusBar
        barStyle = "dark-content"
        //backgroundColor = "#1ca000"
        backgroundColor= "#1E3569"  
      />
      <Header {...props}/>
      
      <ScrollView >
        <View style = {styles.sliderContainer}>
          <Swiper autoplay height={180} activeDotColor= "#ffffff">
            {adList.map((row, index) => {
              return(
              <View key= {index} style = {styles.slide}>
                <Image
                  source={row.image}
                  resizeMode = "cover"
                  style = {styles.sliderImage}
                />
              </View>
            )})}
          </Swiper>
        </View>

        <Category {...props} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5'
  },

  sliderContainer: {
    height: 200,
    marginTop: 7,
    marginBottom: 7,
    justifyContent: 'center',
    alignSelf: 'center',
    
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },

});
