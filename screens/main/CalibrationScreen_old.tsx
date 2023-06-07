import { time } from '@tensorflow/tfjs';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, View, Image, Button,Text, Dimensions, SafeAreaView } from 'react-native';
import { ScoreContext } from '../../store/score-context';
import {TopBar} from '../main/Topbar'

const CalibrationScreen = () => {

  const [standSuccess, setStandSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3);
  const scoreCtx = useContext(ScoreContext);
  var renderCount = useRef(null); 
  var renderCount1 = useRef(null); 

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  async function success() {      
    await delay(2000);
    setStandSuccess(true)
  }  

  useEffect(()=>{
    success()
   if(standSuccess){
    renderCount.current = setInterval(() => {
      setTimeLeft(timeLeft => timeLeft-1)
    }, 1000);
    return ()=>clearInterval(renderCount.current)
   }
  }, [standSuccess])

  useEffect(()=>{
    if(timeLeft === 0){
      clearInterval(renderCount.current)
      scoreCtx.setScreen(3)
    }
  }, [timeLeft])

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'column',position: 'absolute',}}>
        <TopBar 
        left={"返回教學"}
        mid={"站位測定"}
        right={""}
        backScreen={5}/>
        <View style={{backgroundColor: 'white', flexDirection: 'column', position: 'relative', flex: 1, height: Dimensions.get('screen').height-120, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flex:1}}>
              {standSuccess?
              <View style={{marginTop: 20,backgroundColor: 'rgb(235,243,237)', width: (Dimensions.get('screen').width/2/2/2)+(Dimensions.get('screen').width/2), alignItems: 'center'}}>
                <Text style={{color: 'rgb(54,120,65)', fontSize: 40, padding: 10}}>站位正確，請保持姿勢三秒（0{timeLeft}）</Text>
              </View>
              :
              <View style={{marginTop: 20,backgroundColor: 'rgb(226,237,240)', width: (Dimensions.get('screen').width/2/2)+(Dimensions.get('screen').width/2), alignItems: 'center'}}>
                <Text style={{color: 'rgb(41,89,154)', fontSize: 40, padding: 10}}>請擺放裝置在前面，並將身體對準站位線</Text>
              </View>
              }
            </View>

            <View style={{flex:6, alignItems: 'center', width: (Dimensions.get('screen').width/2/2)+(Dimensions.get('screen').width/2)}}>
            {standSuccess?
              <Image
              source={require('../../new_assets/Calibration/Calibration-green-half.png')}
              />:
              <Image
              source={require('../../new_assets/Calibration/Calibration-grey-half.png')}
              />
            }
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
    alignItems: 'center'
},
});

export default CalibrationScreen;