import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Text, Image,  Alert } from 'react-native';
//import {Input} from 'react-native-elements';
//import IconCamera from 'react-native-vector-icons/MaterialCommunityIcons';  
import Header from '../../components/Header';

editProductConnect = async (Info, About, props) => {                        
  
  const url = "http://10.0.2.2:8080/editProduct";
  
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({pinfo: Info.info, 
                            pabout: About.about,
                            pid: props.route.params.pid}),
      headers:{
        "Content-Type": "application/json"
      }
    });    
    if( response.status != 200 ) {
      throw new Error("Something went wrong");
    }
    Alert.alert("Editting successful!");
    props.navigation.navigate('Home');
  }
  catch(error) {
    Alert.alert(error.message);
  }
}

setterInfo = (setInfo, text) => {
  setInfo({info: text})
}

setterAbout = (setAbout, text) => {
  setAbout({about: text})
}

export default function AddProduct( props ) {

  const [Info, setInfo] = useState({info: ""});
  const [About, setAbout] = useState({about: ""});
  
  return(
    
    <View style = {styles.container}>
      <Header {...props}/>
      
      <ScrollView>
        <View style = {styles.inputContainer}>
          
          <View style = {styles.imageBox}>
            <Image
              source = {{uri: props.route.params.pimage}}
              style = {styles.productPic}
              resizeMode = "cover"
            />
          </View>

          <TextInput style={styles.inputBox}
            defaultValue = {props.route.params.name}
            underlineColorAndroid='rgba(0, 0, 0, 0)' 
            placeholder="Product Name"
            editable = {false}
            placeholderTextColor = "#03071e"/>

          <TextInput style={styles.inputBox}
            defaultValue = {props.route.params.aprice.toString()}
            keyboardType={'numeric'}
            underlineColorAndroid='rgba(0, 0, 0, 0)' 
            placeholder="Actual Price"
            editable = {false}
            placeholderTextColor = "#03071e"/> 

          <TextInput style={styles.inputBox}
            defaultValue = {props.route.params.dprice.toString()}
            keyboardType={'numeric'}
            underlineColorAndroid='rgba(0, 0, 0, 0)' 
            placeholder="Discounted Price"
            editable = {false}
            placeholderTextColor = "#03071e"/>

          <TextInput style={styles.inputBox}
            defaultValue = {props.route.params.dpercent.toString()}
            keyboardType={'numeric'}
            underlineColorAndroid='rgba(0, 0, 0, 0)' 
            placeholder="Discount Percent"
            editable = {false}
            placeholderTextColor = "#03071e"/>

          <TextInput style={styles.inputBox}
            defaultValue = {props.route.params.pinfo}
            underlineColorAndroid='rgba(0, 0, 0, 0)' 
            placeholder="Product Information"
            editable = {true}
            placeholderTextColor = "#03071e"
            onChangeText = {text => setterInfo(setInfo, text)}/>

          <TextInput style={styles.inputBox}
            multiline={true}
            numberOfLines={3}
            defaultValue = {props.route.params.about}
            underlineColorAndroid='rgba(0, 0, 0, 0)' 
            placeholder="About"
            editable = {true}
            placeholderTextColor = "#03071e"
            onChangeText = {text => setterAbout(setAbout, text)}/>           
          
          <TouchableOpacity style={styles.button} onPress= {() => { editProductConnect(Info, About, props)}}>
            <Text style={styles.buttonText}> Edit Product </Text>
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

  inputContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",

  },

  imageBox: {
    marginTop: 15,
    marginBottom: 15,
    width: '83%',
    height: 200,
    flex: 1
  },
    
  infoBox: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  
  info: {
    fontSize: 20,
  },

  inputBox: {
    width: 350,
    elevation: 2,
    backgroundColor:'#ffffff',
    borderRadius:25,
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
    backgroundColor:'#ff0a54',
    borderRadius:25,
    width: 350,
    paddingVertical: 15,
    paddingHorizontal:16,
    marginVertical: 10
  },

  productPic: {
    width: '100%',
    height: '100%',
  }
  
});

/*inputContainer : {
  flexGrow: 1,
  marginTop: "5%",
  alignItems: "center",
  justifyContent: "center"
},


container : {
  flex: 1,
},


}*/