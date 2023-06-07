import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Image,Text, Dimensions, TouchableOpacity } from 'react-native';
import { ScoreContext } from '../../store/score-context';
import { ArrowLeftIcon, PlayIcon } from 'react-native-heroicons/outline';

const EndExercise = ({}) => {

  const scoreCtx = useContext(ScoreContext);
  
  return (
    <View style={styles.container}>
      {/* <Image 
      style={{position: 'absolute', width: '100%', height: '100%'}}
      source={require('./assets/elderly.jpeg')}/> */}
      <View style={{backgroundColor: 'black', width: '100%', height: '100%', opacity: 0.6, justifyContent: 'center'}} />
      <View style={{flexDirection: 'column', position: 'absolute', flex:1}}>
        {/* <Text style={{alignSelf: 'center',flex:1, fontSize: 40, color: 'white', marginBottom: 40}}>10秒後自動開始練習</Text> */}
        {scoreCtx.gameCount === 3?
                <View style={{alignSelf: 'center', flex: 4}} >
                <Image style={{width: 795, height: 578}} source={require('../../new_assets/Cloud.png')} />
                <View style={{position: 'absolute', width: '60%',height:'90%',flexDirection: 'column', justifyContent: 'center', alignSelf: 'center', backgroundColor: 'transparent'}}>
                  <Text style={{backgroundColor: 'transparent', textAlign: 'center', justifyContent: 'center', color: 'rgb(225, 119, 95)', fontSize: 86}}>恭喜你完成{"\n"}全部運動</Text>
                </View>
              </View>
        :
        <View style={{alignSelf: 'center', flex: 4}} >
        <Image style={{width: 795, height: 578}} source={require('../../new_assets/Cloud.png')} />
        <View style={{position: 'absolute', width: '60%',height:'90%',flexDirection: 'column', justifyContent: 'center', alignSelf: 'center', backgroundColor: 'transparent'}}>
          <Text style={{backgroundColor: 'transparent', textAlign: 'center', justifyContent: 'center', color: 'rgb(225, 119, 95)', fontSize: 86}}>恭喜你{"\n"}完成此運動</Text>
        </View>
      </View>}


        {scoreCtx.gameCount === 3?
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                {/* <TouchableOpacity onPress={()=>{scoreCtx.setScreen(5);scoreCtx.setGame(1, 38)}} style={{flex: 3, alignItems: 'center', backgroundColor: 'transparent', }}>
                  <Text style={{fontSize: 48, color: 'white'}}>重複全部運動</Text>
                </TouchableOpacity> */}
                <View style={{flex: 4, backgroundColor: 'transparent', alignItems: 'center'}}>
                  <TouchableOpacity onPress={()=>{scoreCtx.setScreen(0);scoreCtx.setGame(0, 0, 0)}} style={{width: 350, height: 80,alignItems: 'center',justifyContent: 'center',backgroundColor: 'rgb(88,151,208)', borderRadius: 25,flexDirection: 'row'}}>
                    <ArrowLeftIcon color={"white"} size={50}/>
                    <Text style={{fontSize: 48,color:'white'}}>返回主頁</Text>
                  </TouchableOpacity>
                </View>
              </View>:
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                {/* <TouchableOpacity onPress={()=>{scoreCtx.setScreen(5);}} style={{flex: 3, alignItems: 'center', backgroundColor: 'transparent', }}>
                  <Text style={{fontSize: 48, color: 'white'}}>重複</Text>
                </TouchableOpacity> */}
                <View style={{flex: 4, backgroundColor: 'transparent', alignItems: 'center'}}>
                  <TouchableOpacity onPress={()=>{scoreCtx.setGame(1, scoreCtx.gameID+1, scoreCtx.gameMode+1);scoreCtx.setScreen(5);}} style={{width: 350, height: 80,justifyContent: 'center',alignItems: 'center',backgroundColor: 'rgb(88,151,208)',borderRadius: 25,flexDirection: 'row'}}>
                    <PlayIcon color={"white"} size={50}/>
                    <Text style={{fontSize: 48,color:'white'}}>下一個練習</Text>
                  </TouchableOpacity>
                </View>
              </View>}



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
    position: 'absolute'
  }
});

export default EndExercise;