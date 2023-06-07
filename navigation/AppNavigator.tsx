import React, { useContext, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';
import AuthScreen from '../screens/login/AuthScreen';
import LoginScreen from '../screens/login/LoginScreen';
import CalibrationScreen from '../screens/main/CalibrationScreen';
import HomeScreen from '../screens/main/HomeScreen';

import PoseDetectScreen from '../screens/main/PoseDetectScreen';
import TutorialScreen from '../screens/main/TutorialScreen';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';

import { ScoreContext } from '../store/score-context';

const AppNavigator: React.FC = () => {
    const scoreCtx = useContext(ScoreContext);

    useEffect(() => {
        console.log("App.tsx useEffect scoreCtx.whichScreen", scoreCtx.whichScreen);
    }, [scoreCtx.whichScreen]);

    return (
        <View style={styles.container}>
            {/* 0 = LoginScreen
            1 = HomeScreen
            2 = AuthScreen 
            3 = PoseDetectScreen
            4 = CalibrationScreen
            5 = TutorialScreen*/}
            {(() => {
                switch (scoreCtx.whichScreen) {
                case 0:
                    return <LoginScreen/>
                case 1:
                    return <HomeScreen/>
                case 2:
                    return <AuthScreen/>
                case 3:
                    return <PoseDetectScreen/>
                case 4:
                    return <CalibrationScreen/>
                case 5:
                    return <TutorialScreen/>
                default:
                    return null
                }
            })()}
            
            {/* {scoreCtx.whichScreen === 1 ?
                <HomeScreen />
                : <LoginScreen />
            } */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'green',
        // backgroundImage: "/Users/jimmy/Desktop/MobilePoseDetection-main/new_assets/2_Exercise_page/Version1/Top_bar_1x.png",
        flexDirection: 'column',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default AppNavigator;