import React, { useState, useEffect, useRef, useContext, useMemo, useCallback } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Platform,
    ViewStyle,
    TextStyle,
    ImageStyle,
    Alert,
    Image,
    Dimensions,
    ImageBackground,
    SafeAreaView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';

//Expo
import Constants from 'expo-constants';

//Components
// import PoseDetectManager, { Pose } from '../../components/posedetect/PoseDetectManager';
import PoseDetect, { Pose } from '../../components/Posedetect/PoseDetect';
import ScorePlate from '../../components/Score/ScorePlate';
import MainButton from '../../components/Buttons/MainButton';
import CountdownTimer from '../../components/Timer/CountdownTimer';

// React useContext
import { ScoreContext } from '../../store/score-context';
import { ResizeMode } from 'expo-av';
const screenWidth = Dimensions.get('screen').width;

const AuthScreen: React.FC = () => {
    const scoreCtx = useContext(ScoreContext);
const screenWidth = Dimensions.get('screen').width;

    const backMenu = () => {
        scoreCtx.setScreen(0);
    };
    const [otp, setOTP] = React.useState('');
    const [OTPVaild, setOTPVaild] = React.useState(false);

    
    const [countdown, setCountdown] = React.useState(120);

    useEffect(() => {
        const interval = setInterval(() => {
            if(countdown > 0){
                setCountdown(countdown => countdown -1);
            } else {
                clearInterval(interval);
                setOTPVaild(true)
            }
        }, 1000);
        return()=> clearInterval(interval);
    }, [countdown])


    return (
        <View style={styles.app}>
        <ImageBackground source={require("../../new_assets/LR-Login2.png")} resizeMode='cover' style={styles.image}>
            <View style={{flexDirection:"row"}}>
            <View style={{flex:1,marginTop:60,marginLeft:30}}>
                    {/*最左邊*/}
                    <TouchableOpacity onPress={() => {backMenu()}}>
                        <Image source={require("../../new_assets/Login/backbtn.png")}></Image>
                    </TouchableOpacity>
                    
             </View>

            <View style={{flex:2}}>
                <View style={{width: '100%', alignContent: 'space-around', paddingVertical: 80}}>
                    <Text style={styles.loginInfo1}>帳戶驗證</Text>
                    <Text style={styles.loginInfo2}>驗證碼已傳送到電話號碼 +852 9876 5432</Text>
                    <Text style={styles.loginInfo3}>驗證碼</Text>
                    <TextInput
                        style={styles.loginInfoInput1}
                        onChangeText={text => setOTP(text)}
                        keyboardType = 'numeric'
                        maxLength={6}
                        value={otp}
                    />
                </View>
                <View style={{ width: '100%', paddingTop: 0,alignItems: 'center'}}>
                <TouchableOpacity onPress={() => {scoreCtx.setScreen(1)}} style={{justifyContent: 'center'}}>
                    <Image source={require("../../new_assets/Login/loginbtn.png")} style={{transform:[{scale:0.85}]}}></Image>
                </TouchableOpacity>
                </View>
                    <Text style={styles.loginInfo2}>收不到一次性密碼?</Text>
                <View style={{ width: '100%', paddingTop: 0,alignItems: 'center'}}>
                        {/*}
                        {OTPVaild ? <Text onPress={() => {setCountdown(countdown => 120), setOTPVaild(!OTPVaild)}} style={{color: 'black', fontSize: 22}}>重新發出一次性密碼</Text> : <Text style={{color: 'gray', fontSize: 22}}>重新發出一次性密碼</Text>}
                        */}
                        <TouchableOpacity onPress={() => {setCountdown(countdown => 120), setOTPVaild(!OTPVaild)}}>
                            <Image source={require("../../new_assets/Login/resendbtn.png")}></Image>
                        </TouchableOpacity>
                    <Text style={{fontSize: 22, color: 'black', textAlign:'center',paddingTop:10}}>於{countdown}S後可再次發出</Text>
                    </View>

            </View>

            <View style={{flex:1}}></View>
            </View>
            </ImageBackground>
        </View>
        
    );
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        flex:1,
        backgroundColor: "#fff8dc",
        alignItems: 'center'
    },
    tabBarText: {
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    login: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: '50%',
    },
    loginInfo: {
        color: 'grey',
        fontSize: 32,
        paddingVertical: 15,
    },
    loginInfo1: {
        color: 'black',
        fontSize: 50,
        paddingVertical: 0,
        textAlign: 'center',
    },
    loginInfo2: {
        color: 'black',
        fontSize: 20,
        paddingVertical:25,
        textAlign: 'center',
    },
    loginInfo3: {
        color: 'black',
        fontSize: 20,
        paddingTop:30,
        textAlign: 'left',
        paddingBottom:10,
    },
    loginInfoInput: {
        height: 60, 
        borderColor: 'blue',
        borderWidth: 1,
        backgroundColor: 'white'
    },
    loginInfoInput1: {
        height: 60, 
        borderColor: 'grey',
        borderWidth: 2,
        borderRadius: 50,
        backgroundColor: 'white',
        textAlign: 'center',
        fontSize: 30,
    },
    goBack: {
        position: 'absolute',
        paddingTop: 14,
        paddingLeft: 30,
        flex: 1,
    },

    app: {
        flex:11, // the number of columns you want to devide the screen into
        marginHorizontal: "auto",
        width: screenWidth,
        backgroundColor: ""
      },
      image:{
        flex:1
      },

});

export default AuthScreen;