import React, { useContext, useEffect, useState } from 'react';
import { ListRenderItem, View, Text, Platform } from 'react-native';
import {  Svg, Image } from 'react-native-svg';
import { ScoreContext } from '../../store/score-context';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


const BUBBLE_IMG = {
  ORANGE: require('../../new_assets/1x/Ball_orange.png'),
  BLUE: require('../../new_assets/1x/Ball_blue.png'),
  PURPLE: require('../../new_assets/1x/Ball_purple.png'),
  GREEN: require('../../new_assets/1x/Ball_green.png'),
  SCORE: require('../../new_assets/1x/scored_orange.png')
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

const CountBubble = (timer) => {

  return (
    <View>
      <AnimatedCircularProgress
        size={130}
        width={20}
        fill={100-Math.floor((130-timer)/25)*20}
        tintColor="white"
        backgroundColor="rgb(151,194,231)">
        {
            (fill) => (
                <View style={{width: '100%', height: '100%', flex:1, backgroundColor: 'rgb(41,89,154)', justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{transform: [{scaleX :-1}], fontSize: 42, color: 'white'}}>{Math.floor((130-timer)/25)}</Text>
                </View>

            )
        }
      </AnimatedCircularProgress>
    </View>
  );
};

export default CountBubble;