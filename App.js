import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image,StyleSheet } from "react-native";
import * as firebase from "firebase";
import {createAppContainer,createSwitchNavigator} from 'react-navigation'


const firebaseConfig = {
  apiKey: "AIzaSyBH3DHUXPLN0TqMBrUZiaG6yaqZlzAPFIU",
  authDomain: "react-firebase-f87f3.firebaseapp.com",
  databaseURL: "https://react-firebase-f87f3.firebaseio.com",
  projectId: "react-firebase-f87f3",
  storageBucket: "react-firebase-f87f3.appspot.com",
  messagingSenderId: "872211933793",
  appId: "1:872211933793:web:475d6a72e228877fb85820",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

import { Container,Content,Header,Form,Input,Item,Button,Label} from 'native-base'
import Animated from 'react-native-reanimated';
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user);
      }
    });
  }

  signUpUser = (email, Password) => {
    try {
      if (this.state.password.length < 6) {
        alert("Please enter atleast 6 characters");
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, Password);
    } catch (error) {
      console.log(error.toString());
    }
  };

  loginUser = (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function (user) {
          console.log(user);
        });
    } catch (error) {
      console.log(error.toString());
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <View style={{...StyleSheet.absoluteFill}}>
        <Image
          source={require("./assets/IND.jpg")}
          style={{flex:1, height: null, width: null }}
        />
        </View>
        <Animated.View style={styles.Text}>
                        <Text style={{fontSize:50,fontWeight:'bold',color:'orange'}}>RISE</Text>
                    </Animated.View>

                    <Animated.View style={styles.Text}>
                        <Text style={{fontSize:50,fontWeight:'bold',color:'white'}}>UP</Text>
                    </Animated.View>

                    <Animated.View style={styles.Text}>
                        <Text style={{fontSize:50,fontWeight:'bold',color:'green'}}>INDIA</Text>
                    </Animated.View> 
        <Item floatingLabel style={styles.Label}>
          <Label style={{color:'white'}}>Email</Label>
          <Input style={{color:'white'}}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(email) => this.setState({email})}
          
          />
        </Item>
        <Item floatingLabel style={styles.Label}>
          <Label style={{color:'white'}}>Password</Label>
          <Input style={{color:'white'}}
          secureTextEntry={true}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(password) => this.setState({password})}
          
          />
        </Item>
        <Button  style={styles.Button}
        full
        rounded
        success
        onPress = {()=> this.loginUser(this.state.email,this.state.password)}
        >
          <Text style={{color:'white'}}> Login</Text>
        </Button>
        

        
        <Button  style={styles.Button}

        full
        rounded
        primary
        onPress = {()=> this.signUpUser(this.state.email,this.state.password)}
        >
          <Text style={{color:'white'}}> Sign Up</Text>
        </Button>
        </View>
    );
  }
}

const AppSwitchNavigator = createSwitchNavigator({

  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen

})

const AppNavigator = createAppContainer(AppSwitchNavigator);


const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  },
  Text:{
    alignItems:'center',
    justifyContent:'center',
    top:-90
},
Button: {
  backgroundColor:'black',
  marginTop:15,
  top:100
},
Label: {
  top:80,
  marginTop:5
}
});