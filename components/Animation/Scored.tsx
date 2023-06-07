import React, { useState,useEffect } from "react";
import { View, Button, Image, StyleSheet, Dimensions, Animated } from "react-native";

const Scored = () => {

  const screenWidth = Dimensions.get('screen').width

  var randomValue = Math.floor(Math.random() * (screenWidth-200)) + 100;

  return (
    <View style={styles.container}>
        <Image source={require('../../new_assets/1x/scored_orange.png')} style={{...styles.image}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height-114,
    // backgroundColor: 'red',
    position: 'absolute',
    margin: 0,
  },
  image: {
    width: 100,
    height: 100,
  }
});

export default Scored;