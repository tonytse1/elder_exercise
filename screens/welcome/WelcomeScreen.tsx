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
    Dimensions
} from 'react-native';

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

// camera size in imaginary pixel
const cameraWidth = Math.round(Dimensions.get('window').width); //1194
const cameraHeight = Math.round(Dimensions.get('window').height); //834

const WelcomeScreen: React.FC = () => {
    const scoreCtx = useContext(ScoreContext);

    const onStartButtonPressed = () => {
        scoreCtx.setScreen(1);
    };

    return (
        <View style={styles.container}>
            <View  style={styles.title}>
                <Image 
                    source={require('../../assets/inspire.png')}
                />
                <Text style={styles.titleText}>Pose Detection App</Text>
            </View>
            
            <MainButton
                onPress={onStartButtonPressed}
            >
                Start
            </MainButton>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: 'white',
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
    titleText: {
        fontSize: 56,
        fontWeight: 'bold',
        color: "darkgray",
    }
});

export default WelcomeScreen;