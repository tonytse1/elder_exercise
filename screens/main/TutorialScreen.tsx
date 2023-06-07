import { time } from '@tensorflow/tfjs';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, View, Image, Button,Text, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { ScoreContext } from '../../store/score-context';
import {TopBar} from '../main/Topbar'
import { TutorialVideo } from './TutorialVideo';


const TutorialScreen = () => {

  const scoreCtx = useContext(ScoreContext);
  const [replay, setReplay] = useState(false)

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'column',position: 'absolute',}}>
        <TopBar 
        left={"返回主頁"}
        mid={"肩膊 - 打橫舉至盡"}
        right={""}
        backScreen={0}/>
        <View style={{backgroundColor: 'rgb(247,247,247)', flexDirection: 'column', position: 'relative', flex: 1, height: Dimensions.get('screen').height-120,justifyContent: 'center', alignItems:'center'}}>
            <View style={{flex:6,width: (Dimensions.get('screen').width/2)+(Dimensions.get('screen').width/2/2)}}>
                <TutorialVideo 
                replay={replay}/>
            </View>

            <View style={{flex:2, flexDirection: 'row',backgroundColor: 'rgb(231,242,245)', width: (Dimensions.get('screen').width)}}>
                <View style={{flex:3, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'rgb(41,89,154)', fontSize: 32, marginLeft: 20}}>向橫打開手臂，舉至最高點，就像用手畫一個半圓形一樣。</Text>
                </View>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => scoreCtx.setScreen(4)} style={{...styles.button, width: 180}}>
                        <Text style={{textAlign: 'center', color: 'white', justifyContent: 'center', height: 80,fontSize: 34, marginTop: 10}}>開始練習</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
                    <TouchableOpacity onPress={() => setReplay(!replay)} style={{...styles.button, backgroundColor: 'transparent'}}>
                        <Text style={{textAlign: 'center', color: 'rgb(88,151,208)', justifyContent: 'center', height: 80, fontSize: 34, marginTop: 10}}>重播</Text>
                    </TouchableOpacity>
                </View>
            </View>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: 'rgb(247, 247,247)',
  },
  top_bar: {
    width: Dimensions.get('screen').width,
    height: 120,
    backgroundColor: 'white',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderTopWidth: 0
  },
  tabBarText: {
    position: 'absolute',
    flexDirection: 'row',
    width: Dimensions.get('screen').width,
    height: '100%',
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    },
    button: {
        width: 150,
        height: 80,
        borderRadius: 50,
        backgroundColor: 'rgb(88,151,208)',
        borderColor: 'rgb(88,151,208)',
        borderWidth: 5
    }
});

export default TutorialScreen;