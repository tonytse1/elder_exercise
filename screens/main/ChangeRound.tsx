import React, { useState } from 'react';
import { StyleSheet, View, Image, Button,Text, Dimensions } from 'react-native';

const ChangeRound = ({round, maxRound}) => {

  return (
    <View style={styles.container}>
      {/* <Image 
      style={{position: 'absolute', width: '100%', height: '100%'}}
      source={require('./assets/elderly.jpeg')}/> */}
      <View style={{backgroundColor: 'black', width: '100%', height: '100%', opacity: 0.6, justifyContent: 'center'}} />
      <View style={{flexDirection: 'column', position: 'absolute', flex:1}}>
        {/* <Text style={{alignSelf: 'center',flex:1, fontSize: 40, color: 'white', marginBottom: 40}}>10秒後自動開始練習</Text> */}
        <View style={{alignSelf: 'center', flex: 3}} >
          <Image source={require('../../new_assets/round_intro.png')} />
          <View style={{position: 'absolute', width: '60%',height:'60%',flexDirection: 'column', justifyContent: 'center', alignSelf: 'center', marginTop: 125}}>
            <Text style={{backgroundColor: 'transparent', textAlign: 'center', flex: 1, fontSize: 26}}>肩膊 - 打橫舉至盡（幅度練習）</Text>
            <Text style={{backgroundColor: 'transparent', textAlign: 'center', flex: 4, color: 'rgb(57, 129, 198)', fontSize: 126}}>第{round}回合</Text>
            <Text style={{backgroundColor: 'transparent', textAlign: 'center', flex: 4,color: 'rgb(57, 129, 198)', fontSize: 72}}>(總共{maxRound}回合)</Text>
          </View>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height-114,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    marginTop: 114
  }
});

export default ChangeRound;