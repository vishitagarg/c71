import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity,TextInput,Image , ImageBackground
 } from 'react-native';
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from 'expo-barcode-scanner';
import db from "../config";

const bgImage=require("../assets/background2.png");
const appIcon=require("../assets/appIcon.png");
const appName=require("../assets/appName.png");

export default class TransactionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domState:"normal",
      hasCameraPermissions:null,
      scanned:false,
      scannedData:" ",
      bookId:"",
      studentId:"",

    }
  }
  getCameraPermissions = async domState =>{
    const{status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions:status==="granted",
      domState:domState,
      scanned:false,
    })
  } 
  handleBarCodeScanned = async({type,data})=>{
    const {domState}=this.state;
    
    if (domState==="bookId"){
      this.setState({
        bookId:data,
        domState:"normal",
        scanned:true,
      })
    }
    else if (domState==="studentId"){
      this.setState({
       studentId:data,
       domState:"normal",
       scanned:true,
     })
    }
    
  }

  handleTransaction=()=> {
    var {bookId}=this.state;
    db.collection("books")
    .doc(bookId)
    .get()
    .then(doc=>{
      console.log(doc.data())
      var book = doc.data();
      if(book.is_book_available){
        this.initiateBookIssue();
      }
      else{
        this.initiateBookReturn();
      }
    });
  }

  initiateBookIssue=()=>{
    console.log("book issued to student");
  };

  initiateBookReturn=()=>{
    console.log("book returned to liberary");
  };

  render() {
    const {domState,scanned,bookId,studentId} = this.state;
    if(domState!=="normal"){
      return (
        <BarCodeScanner
        onBarCodeScanned = {scanned?undefined:this.handleBarCodeScanned}
        style = {StyleSheet.absoluteFillObject}/>
      )
    }
    return (
      <View style={styles.container}>
        <ImageBackground source= {bgImage} style = {styles.bgImage}>
        <View style={styles.upperContainer}>
        <Image  source= {appIcon} style = {styles.appIcon}/>
        <Image  source = {appName} style = {styles.appName}/>  
        </View>
        
        <View style={styles.lowerContainer}>
        <View style={styles.textinputContainer}>
        <TextInput 
        style={styles.textInput}
        placeholder={"Book Id"}
        placeholderTextColor={"#FFFFFF"}
        value={bookId}
        />

        <TouchableOpacity style = {styles.scanButton}
        onPress = {()=> this.getCameraPermissions("bookId")}>
          <Text style = {styles.scanButtonText}>
            scan 
          </Text>
        </TouchableOpacity>
        </View>
        
        <View style ={[styles.textinputContainer,{marginTop:25}]}>
        <TextInput
        style = {styles.textInput}
        placeholder = {"student Id"}
        placeholderTextColor={"#FFFFFF"}
        value='studentId'
        />

        <TouchableOpacity style = {styles.scanButton}
        onPress = {()=> this.getCameraPermissions("studentId")}>
          <Text style = {styles.scanButtonText}>
            scan
          </Text>

        </TouchableOpacity>
        </View>
        <TouchableOpacity 
        style= {[styles.button,{marginTop:25}]}
        onPress={this.handleTransaction}>
        <Text style= {styles.buttonText}>
          submit 
        </Text>
        </TouchableOpacity>
          
        </View>
        </ImageBackground>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFFFFF",

    },
    bgImage:{
      flex:1,
      resizeMode:"cover",
      justifyContent:"center",

    },
    upperContainer:{
      flex:0.5,
      justifyContent:"center",
      alignItems:"center",

    },
     appIcon:{
       width:200,
       height:200,
       resizeMode:"contain",
       marginTop:18,

     },
     appName:{
       width:80,
       height:80,
       resizeMode:"contain",
       
     },
    text:{
        color:"black",
        fontSize:30,
    },
    button:{
      width:"43%",
      height:55,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"#F48D20",
      borderRadius:15,
    },
    buttonText:{
      fontSize:24,
      color:"white",
      fontFamily:"Rajdhani_600SemiBold",
    },
    lowerContainer:{
      flex:0.5,
      alignItems:"center",
    
    },
    textinputContainer:{
      borderWidth:2,
      borderRadius:10,
      flexDirection:"row",
      backgroundColor:"#9DFD24",
      borderColor:"white",
    },
    textInput:{
      width:"57%",
      height:50,
      padding:10,
      borderColor:"white",
      borderRadius:10,
      borderWidth:3,
      fontSize:18,
      backgroundColor:"#5653D4",
      fontFamily:"Rajdhani_600SemiBold",
      color:"white",
      
    },
    scanButton:{
      width:100,
      height:50,
      backgroundColor:"#9DFD24",
      borderTopRightRadius:10,
      borderBottomRightRadius:10,
      justifyContent:"center",
      alignItems:"center",
    },
    scanButtonText:{
      fontSize:24,
      color:"#0A0101",
      fontFamily:"Rajdhani_600SemiBold",
    }
})