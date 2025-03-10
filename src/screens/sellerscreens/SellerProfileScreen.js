import React, {useState, useEffect} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Text, Image, Alert, ScrollView, Dimensions} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Header  from '../../components/Header';
import AsyncStorage from '@react-native-community/async-storage';

sellerEditProfile = async (editSaveButton, Phone, Email, ShopName, ShopAddress, props) => {
  
  if( editSaveButton == 'Save'){
    
    const url = "http://10.0.2.2:8080/sellerEditProfile";
    try {

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({pno: Phone.pno,
                              email: Email.email,
                              sname: ShopName.shopName,
                              saddress: ShopAddress.shopAddress}),
        headers: {
          "Content-Type": "application/json"
        }
      });    
      if( response.status != 200 ) {
        throw new Error("Something went wrong");
      }
      Alert.alert("Profile Updated");
      props.navigation.navigate('SellerHome');
    }
    catch(error) {
      Alert.alert(error.message);
    }
  }
}

sellerProfileConnect = async (setPhone, setName, setEmail, setProfilePic, setShopName, setShopAddress, setShopPic) => {

  const url = "http://10.0.2.2:8080/sellerProfile";
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
    
    setPhone({pno: datalist[0].PhoneNo}); 
    setName({name: datalist[0].Name});
    setEmail({email: datalist[0].EmailId});
    setShopName({shopName: datalist[0].ShopName});
    setShopAddress({shopAddress: datalist[0].ShopAddress});
    setProfilePic({profilePic: datalist[0].ProfilePic});
    setShopPic({shopPic: datalist[0].ShopPic});
  }
  catch(error) {
    Alert.alert(error.message);
  }
}

sellerEnableEdit = (setIsEditable, setEditSaveButton) => {
  setIsEditable(true);
  setEditSaveButton('Save');
}



export default function SellerProfileScreen( props ) {
  
  const [Phone, setPhone] = useState({pno: ""})
  const [Name, setName] = useState({name: ""})
  const [Email, setEmail] = useState({ email: ""})
  const [ProfilePic, setProfilePic] = useState({ profilePic: "abc.png"})
  const [ShopName, setShopName] = useState({ shopName: ""})
  const [ShopAddress, setShopAddress] = useState({ shopAddress: ""}) 
  const [ShopPic, setShopPic] = useState({shopPic: "abc.png"})

  const [isEditable, setIsEditable] = useState(false);
  const [editSaveButton, setEditSaveButton] = useState('Edit');
  const isFocused = useIsFocused();

  useEffect(() => {
    sellerProfileConnect( setPhone, setName, setEmail, setProfilePic, setShopName, setShopAddress, setShopPic);
    setIsEditable(false);
    setEditSaveButton('Edit');
  },[isFocused])

  return (
  
    <View style={styles.container}>
      
      <Header {...props}/>

      <ScrollView>
        
        <View style = {styles.inputContainer}>
          <View style = {styles.imageContainer}>

            <Image
              source = {{uri: ShopPic.shopPic}}
              style = {styles.coverPic}
              resizeMode = "cover"
              width = {Dimensions.get('screen').width}
              height = {200}
            />

            <View style = {styles.imageBox}>
              <Image
                source = {{uri: ProfilePic.profilePic}}
                style = {styles.profilePic}
                resizeMode = "cover"
              />
            </View>
          </View>

          <TextInput style={styles.inputBox} 
            defaultValue = {Phone.pno.toString()}
            underlineColorAndroid='rgba(0, 0, 0, 0)' 
            placeholder="Phone no."
            placeholderTextColor="#03071e"
            editable = {false}/>

          <TextInput style={styles.inputBox} 
            defaultValue = {Email.email}
            underlineColorAndroid='rgba(0, 0, 0, 0)' 
            placeholder="Email ID"
            placeholderTextColor="#03071e"
            onChangeText = { text => setEmail({email: text})}
            editable = {isEditable}/>    
          
          <TextInput style={styles.inputBox} 
            defaultValue = {Name.name}
            underlineColorAndroid='rgba(0, 0, 0, 0)' 
            placeholder="Name"
            placeholderTextColor="#03071e"
            editable = {false}/>

          <TextInput style={styles.inputBox} 
            defaultValue = {ShopName.shopName}
            underlineColorAndroid='rgba(0, 0, 0, 0)' 
            placeholder="Shop Name"
            placeholderTextColor="#03071e"
            onChangeText = { text => setShopName({shopName: text})}
            editable = {isEditable}/>

          <TextInput style={styles.inputBox} 
            defaultValue = {ShopAddress.shopAddress}
            underlineColorAndroid='rgba(0, 0, 0, 0)' 
            placeholder="Shop Address"
            placeholderTextColor="#03071e"
            onChangeText = { text => setShopAddress({shopAddress: text})}
            editable = {isEditable}/>
          
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}> Change Password </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress = {() => {
                                                    sellerEnableEdit(setIsEditable, 
                                                    setEditSaveButton), sellerEditProfile(editSaveButton, Phone, Email, ShopName, ShopAddress, props) } }>
            <Text style={styles.buttonText}> {editSaveButton} </Text>
          </TouchableOpacity>
        </View>      
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inputContainer : {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  inputBox: {
    width: 350,
    elevation: 2,
    backgroundColor:'#ffffff',
    paddingHorizontal:16,
    fontSize:20,
    marginVertical: 10,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color:'#ffffff',
    backgroundColor: '#ff0a54',
    textAlign:"center"
  },

  button: {
    backgroundColor:'#ff0a54',
    borderRadius:25,
    width: 350,
    paddingVertical: 15,
    paddingHorizontal:16,
    marginVertical: 10
  },

  profilePic: {
    width: "100%",
    height: "100%",
    borderRadius: 150,
  },

  coverPic: {
    width: '100%',
    height: '100%',
  },

  imageBox: {
    flex: 1,
    width: 150,
    height: 150,
    borderRadius: 150,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    padding: 3,
    marginTop: 120,
    position: "absolute"
  },

  imageContainer: {
    flex: 1,
    height: 300,
    alignItems: "center",
    marginBottom: "5%",
  }
});
