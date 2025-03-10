import React, {useState, useEffect} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Text, Alert, Image, ScrollView} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Header  from '../../components/Header';
import AsyncStorage from '@react-native-community/async-storage';


buyerEditProfile = async (editSaveButton,Phone, Email, Address, props) => {
  
  if( editSaveButton == 'Save') {
    
    const url = "http://10.0.2.2:8080/buyerEditProfile";
    try {

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({pno: Phone.pno,
                              email: Email.email,
                              address: Address.address}),
        headers: {
          "Content-Type": "application/json"
        }
      });    
      if( response.status != 200 ) {
        throw new Error("Something went wrong");
      }
      Alert.alert("Profile Updated");
      props.navigation.navigate('Home');
    }
    catch(error) {
      Alert.alert(error.message);
    }
  }
}



buyerProfileConnect = async (setPhone, setName, setEmail, setAddress, setPic) => {

  const url = "http://10.0.2.2:8080/buyerProfile";
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
    setAddress({address: datalist[0].Address});
    setPic({pic: datalist[0].ProfilePic});
  }
  catch(error) {
    Alert.alert(error.message);
  }
}

buyerEnableEdit = (setIsEditable, setEditSaveButton) => {
  setIsEditable(true);
  setEditSaveButton('Save');
}


export default function ProfileScreen( props ) {

  const [Phone, setPhone] = useState({pno: ""})
  const [Name, setName] = useState({name: ""})
  const [Email, setEmail] = useState({ email: ""})
  const [Address, setAddress] = useState({address: ""})
  const [Pic, setPic] = useState({ pic: "abc.png" })
  const [isEditable, setIsEditable] = useState(false);
  const [editSaveButton, setEditSaveButton] = useState('Edit');
  const isFocused = useIsFocused();

  useEffect(() => {
    buyerProfileConnect( setPhone, setName, setEmail, setAddress, setPic );
    setIsEditable(false);
    setEditSaveButton('Edit');
  },[isFocused])

  return (
  
    <View style={styles.container}>
      
      <Header {...props}/>

      <ScrollView>
        <View style = {styles.inputContainer}>
          
          <View style = {styles.imageBox}>

            <Image
              source = {{uri: Pic.pic}}
              style = {styles.profilePic}
              resizeMode = "stretch"
            />
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
            onChangeText = {text => setEmail({email: text})}
            editable = {isEditable}/> 

          <TextInput style={styles.inputBox} 
            defaultValue = {Name.name}
            underlineColorAndroid='rgba(0, 0, 0, 0)' 
            placeholder="Name"
            placeholderTextColor="#03071e"
            editable = {false}/>   
          
          <TextInput style={styles.inputBox}
            defaultValue = {Address.address} 
            underlineColorAndroid='rgba(0, 0, 0, 0)' 
            placeholder="Address"
            placeholderTextColor="#03071e"
            onChangeText = {text => setAddress({address: text})}
            editable = {isEditable}/>    
          
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}> Change Password </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress = {() => { 
                                                    buyerEnableEdit(setIsEditable, 
                                                    setEditSaveButton), buyerEditProfile(editSaveButton, Phone, Email, Address, props)}}>
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
    marginTop: "5%",
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

  buttonText:{
    fontSize:20,
    fontWeight: '500',
    color:'#ffffff',
    textAlign:"center"
  },

  button: {
    backgroundColor:'#84c225',
    borderRadius: 15,
    width: 350,
    paddingVertical: 15,
    paddingHorizontal:16,
    marginVertical: 10
  },

  profilePic: {
    //flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 120
  },

  imageBox: {
    flex: 1,
    backgroundColor: "#456254",
    borderRadius: 120,
    elevation: 5,
    padding: 3,
    width: 120,
    height: 120,
    marginBottom: "5%"
  },
  
});
