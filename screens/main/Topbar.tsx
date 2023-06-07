
import React, { useContext } from 'react';
import { StyleSheet, View, Image, Button,Text, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { ScoreContext } from '../../store/score-context';

export function TopBar({left, mid, right, backScreen}){
  const scoreCtx = useContext(ScoreContext);
  return (
    <View style={styles.top_bar}>
        <View style={styles.tabBarText}>
            {/*最左邊*/}
            <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 50, marginTop: 10}} onPress={()=>{{scoreCtx.setScreen(backScreen);}}}>
              <ArrowLeftIcon size={50} color='rgb(88, 151, 208)'/>
              <Text style={{color: 'rgb(88, 151, 208)', fontSize: 30}}> {left}</Text>
            </TouchableOpacity>
            {/*中間*/}
            <Text style={{color: 'black', fontSize: 32, flex: 1, textAlign: 'center'}}>{mid}</Text>
            {/*最右邊*/}
            <TouchableOpacity style={{flex: 1}}>
            <Text style={{color: 'rgb(88, 151, 208)',fontSize: 30, textAlign: 'center'}}>{right}</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top_bar: {
    width: Dimensions.get('screen').width,
    height: 114,
    backgroundColor: 'white',
    // borderBottomLeftRadius: 50,
    // borderBottomRightRadius: 50,
    borderColor: 'gray',
    borderWidth: 1,
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