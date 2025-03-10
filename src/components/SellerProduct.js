import React from 'react';
import { ScrollView, TouchableOpacity, View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import Header from './Header3';

export default function Product( props ) {
  return(
    
    <SafeAreaView style = {styles.container}>
      
      <Header {...props} />
      
      <ScrollView>
        <View style = {styles.itemBox}>
          <View style = {styles.image}>
            <Image source = {{ uri: props.route.params.ProductImage }}
              style = {styles.cardImage}
              resizeMode = "stretch"
            />
          </View>

          <View style = {styles.contentDetails}>
            <Text style = {styles.prodName}>{props.route.params.ProductName}</Text>
            <Text style = {styles.prodInfo}>{props.route.params.ProductInfo}</Text>
            
            <View style = {styles.priceBox}>
              <Text style = {styles.prodDisPrice}>₹{props.route.params.DiscountedPrice}</Text>
              <Text style = {styles.prodPrice}>₹{props.route.params.ActualPrice}</Text>
              <Text style = {styles.prodDiscount}>{props.route.params.DiscountPercent}%</Text>
            </View>
            
            <Text style = {styles.prodDesc}>{props.route.params.About}</Text>
          </View>
        
        </View>
      </ScrollView>
      
      <View style = {styles.bottomButtons}>
              
        <TouchableOpacity style = {styles.saveButton} onPress = {() => alert('Deleted')}>
          <Text style = {styles.saveButtonText}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.cartButton} 
          onPress = {() => props.navigation.navigate('EditProduct', {pid: props.route.params.ProductId, 
                                                                    name: props.route.params.ProductName,  
                                                                    aprice: props.route.params.ActualPrice,
                                                                    dprice: props.route.params.DiscountedPrice,
                                                                    dpercent: props.route.params.DiscountPercent,
                                                                    pinfo: props.route.params.ProductInfo,
                                                                    about: props.route.params.About,
                                                                    pimage: props.route.params.ProductImage})}>
          <Text style = {styles.cartButtonText}>Edit</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  bottomButtons: {
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  cartButton: {
    backgroundColor: "#ff0a54",
    width: "50%",
    paddingVertical: 18,
    paddingHorizontal:16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 50,
  },

  saveButton: {
    width: "50%",
    backgroundColor: "#38b000",
    paddingVertical: 18,
    paddingHorizontal:16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 50,
  },

  saveButtonText: {
    fontSize: 18,
    color: "#ffffff",
  },

  cartButtonText: {
    fontSize: 18,
    color: "#ffffff",
  },

  image: {
    height: 400,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",

  },

  cardImage: {
    height: '70%',
    width: '70%',
  },

  itemBox: {
    flexShrink: 1,
    backgroundColor: "#ffffff",
  },

  contentDetails: {
    marginLeft: "5%",
  },

  prodName: {
    fontSize: 22,
    color: "#000000",
  },

  prodInfo: {
    fontSize: 18,
    color: "#7f7f7f"
  },

  prodDesc: {
    fontSize: 30,
    color: "#7f7f7f"
  },

  priceBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  prodDisPrice: {
    fontSize: 25,
    fontWeight: '400',
    color: "#000000",
  },

  prodPrice: {
    marginLeft: "2%",
    fontSize: 22,
    textDecorationLine: "line-through",
    fontWeight: '900',
    color: "#3a3a40",

  },

  prodDiscount: {
    marginLeft: "2%",
    fontSize: 20,
    fontWeight: 'bold',
    color: "#557824",
  },
})