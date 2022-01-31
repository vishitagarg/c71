import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export default class SearchScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.text}>
              Search Screen
        </Text>
        
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"blue",

    },
    text:{
        color:"black",
        fontSize:30,
    }
})