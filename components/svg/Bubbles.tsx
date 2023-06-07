import React, { useContext, useEffect, useState } from 'react';
import { ListRenderItem, View, Text, Platform, Image as Img, Dimensions } from 'react-native';
import {  Svg, Image } from 'react-native-svg';
import { ScoreContext } from '../../store/score-context';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CountBubbles from './CountBubbles';


const BUBBLE_IMG = {
  ORANGE: require('../../new_assets/1x/Ball_orange.png'),
  BLUE: require('../../new_assets/1x/Ball_blue.png'),
  PURPLE: require('../../new_assets/1x/Ball_purple.png'),
  GREEN: require('../../new_assets/1x/Ball_green.png'),
  OSCORE: require('../../new_assets/1x/scored_orange.png'),
  BSCORE: require('../../new_assets/1x/scored_blue.png'),
  GSCORE: require('../../new_assets/1x/scored_green.png'),
  PSCORE: require('../../new_assets/1x/scored_purple.png'),
}
export const BUBBLE_COLOR = {
  ORANGE: "ORANGE",
  BLUE: "BLUE",
  PURPLE: "PURPLE",
  GREEN: "GREEN"
}
export type Bubble = { 
  bid: number,
  bxCoor: number, 
  byCoor: number, 
  color: number
}

const Bubbles = ({bubbles, timer1, timer2, gameMode}) => {

  const getColor = (color) => {
    switch (color){
      case "BLUE":
        return BUBBLE_IMG.BSCORE
      case "PURPLE":
        return BUBBLE_IMG.PSCORE
      case "GREEN":
        return BUBBLE_IMG.GSCORE
      default:
          return BUBBLE_IMG.OSCORE
    }
  }


  return (
    <View>
      <Svg style={Platform.OS === "ios" ? {transform: [{scaleX:-1}]} :{}}>
      {bubbles.map((bubble, index) => (  
        <View key={index} style={{left: bubble.bxCoor, top: bubble.byCoor, position: 'absolute', width: 150, height: 150, justifyContent: 'center', alignItems: 'center'}}>
        {gameMode ===2?
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {bubble.showScore?
                <View style={{transform: [{scaleX: -1}], alignItems: 'center', justifyContent: 'center'}}>
                    <Img
                      key={bubble.bid}
                      source={getColor(bubble.color)}
                      style={{width:98, height:98}}
                      />  
                </View>
                :
                <View style={{backgroundColor: 'transparent'}}>
                  {bubble.bid === 1?
                    <AnimatedCircularProgress
                    size={130}
                    width={20}
                    fill={100-Math.floor((130-timer1)/25)*20}
                    tintColor="white"
                    backgroundColor="rgb(151,194,231)">
                      {
                          (fill) => (
                              <View style={{width: '100%', height: '100%', flex:1, backgroundColor: 'rgb(41,89,154)', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={Platform.OS === 'ios'?{transform: [{scaleX :-1}], fontSize: 42, color: 'white'}:{fontSize: 42, color: 'white'}}>{Math.floor((130-timer1)/25)}</Text>
                              </View>
              
                          )
                      }
                    </AnimatedCircularProgress>
                  :
                  <AnimatedCircularProgress
                  size={130}
                  width={20}
                  fill={100-Math.floor((130-timer2)/25)*20}
                  tintColor="white"
                  backgroundColor="rgb(151,194,231)">
                    {
                        (fill) => (
                            <View style={{width: '100%', height: '100%', flex:1, backgroundColor: 'rgb(41,89,154)', justifyContent: 'center', alignItems: 'center'}}>
                              <Text style={Platform.OS === 'ios'?{transform: [{scaleX :-1}], fontSize: 42, color: 'white'}:{fontSize: 42, color: 'white'}}>{Math.floor((130-timer2)/25)}</Text>
                            </View>
            
                        )
                    }
                  </AnimatedCircularProgress>
                  }
                </View>
                }
              </View>
        :
        <Svg style={{position: 'absolute', transform: [{scaleX:-1}]}}>
          {bubble.showScore?
          <Image
          key={bubble.bid}
          href={getColor(bubble.color)}
          width={98}
          height={98}
          x={bubble.bxCoor}
          y={bubble.byCoor}
          />  
          :
          <Image
          key={bubble.bid}
          href={BUBBLE_IMG[bubble.color]}
          width={150}
          height={150}
          x={bubble.bxCoor}
          y={bubble.byCoor}
          />  
          }

      </Svg>
        }
      </View>
        ))}
      </Svg>  
    </View>
  );
};

export default Bubbles;