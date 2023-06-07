import React, { useState, useEffect, useRef, useContext, useMemo, useCallback } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Alert,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import { findBubbleCoords, getValidSavedPoses, getPoseInvalidDescription } from './Calibration'

//Expo
import Constants from 'expo-constants';
import { CameraType } from 'expo-camera';

//Components
import PoseDetect, { Pose } from '../../components/posedetect/PoseDetect';
import { BUBBLE_COLOR } from '../../components/svg/Bubbles';

// React useContext
import { ScoreContext } from '../../store/score-context';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { max, Value } from 'react-native-reanimated';
import Scored from '../../components/Animation/Scored';
import { update } from '@tensorflow/tfjs-layers/dist/variables';
import ChangeRound from './ChangeRound';
import { TopBar } from './Topbar';
import { Audio } from 'expo-av'

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height
const DEFAULT_BUBBLE_COORD = [
  {x:(screenWidth/2-400), y:(screenHeight/2-90)},
  {x:(screenWidth/2+300), y:(screenHeight/2-90)},
  {x:(screenWidth/2-350), y:(screenHeight/2+30)},
  {x:(screenWidth/2+250), y:(screenHeight/2+30)},
  {x:(screenWidth/2-430), y:(screenHeight/2-210)},
  {x:(screenWidth/2+330), y:(screenHeight/2-210)}
];

const IMG = {
  UPPER_BODY: {
    DEFAULT: require('../../new_assets/Calibration/Calibration-grey-half.png'),
    SUCCESS: require('../../new_assets/Calibration/Calibration-green-half.png')
  }
}

const savedPoses = [];
const MIN_VALID_POSES_NEEDED_BEFORE_CALIBRATION = 10

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

const playScoredSound = async (soundEffectObject) => {
  if (soundEffectObject !== null && soundEffectObject !== undefined) {
    try {
      await soundEffectObject.playAsync();
    } catch (error) {
      console.log('Failed to play the sound effect', error);
    }
  } else {
    console.log("Sound Effect null")
  }
};

const transformBubbleCoordsToBubbleList = coords => {
  return coords.map((coord, idx: number) => ({
    bid: idx + 1, color: BUBBLE_COLOR.BLUE, byCoor: coord.y, bxCoor: coord.x, maxRound: 5
  }))
}

const PoseDetectScreen: React.FC = () => {

    const [line1, setLine1] = useState(false);
    const [line2, setLine2] = useState(false);
    // var [passList, setPassList] = useState(bubblesList)

    const scoreCtx = useContext(ScoreContext);
    // const score = useRef<number>(0);

    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [debugMode, setDebugMode] = useState(scoreCtx.runAppConfig.debugMode);
    const [debugMsg, setDebugMsg] = useState<string>("")
    const [nextRound, setNextRound] = useState(false);
    const [nextRoundMsg, setNextRoundMsg] = useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState<boolean>(true);
    const [whichCamera, setWhichCamera] = useState<CameraType>(CameraType.front)
    useEffect(()=>{
        console.log(screenWidth)
        console.log(screenHeight)
        onStartButtonPressed()
    }, [])


    const onScoreUpdate = (tempScore: number) => {

    };

    const [soundEffect, setSoundEffect] = useState(null);

    const loadSoundEffect = async () => {
      const soundEffectObject = new Audio.Sound();
      try {
        await soundEffectObject.loadAsync(require('/Users/jimmy/Desktop/Intern Work/MobilePoseDetection-main 2/new_assets/correct_sound.mp3'));
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          playThroughEarpieceAndroid: false,
        });
        console.log("Sound Loaded!!")
        setSoundEffect(soundEffectObject);
        playScoredSound(soundEffectObject);
      } catch (error) {
        console.log('Failed to load the sound effect', error);
      }
    };


    const onStartButtonPressed = () => {
        setIsCameraOpen(true);
        // const timerId = setTimeout(() => {
        // setFinishTime(new Date(new Date().valueOf() + 60 * 1000));
        setGameStarted(true);
        setNextRoundMsg(true);
        setTimeout(()=>{
            setNextRoundMsg(false);
        }, 3000)
        // }, 2* 1000);
    };


    // const [standSuccess, setStandSuccess] = useState(false);
    const [timeLeft, setTimeLeft] = useState(3);
    const [bubbleCoords, setBubbleCoords] = useState([])
    const [isCalibrationFinished, setIsCalibrationFinished] = useState(false)
    var renderCount = useRef(null); 

    useEffect(()=>{
     if(isCalibrationFinished){
      // loadSoundEffect();
      // console.log("Saved Poses:", JSON.stringify(savedPoses)) // To log saved poses for motion filtering script
      console.log("Calibration Success!", bubbleCoords)
      scoreCtx.setCalibratedBubbleList(bubbleCoords)
      renderCount.current = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft-1)
      }, 1000);
      return ()=>clearInterval(renderCount.current)
     }
    }, [isCalibrationFinished])
  
    useEffect(()=>{
      if(timeLeft === 0){
        clearInterval(renderCount.current)
        scoreCtx.setScreen(3)
      }
    }, [timeLeft])

    const onPoseDetected = (pose: Pose) => {
      if (!scoreCtx.runAppConfig.isRealCalibration) {
        // Skip real calibration
        console.log("Real calibration skipped!")
        setBubbleCoords(transformBubbleCoordsToBubbleList(DEFAULT_BUBBLE_COORD))
        setIsCalibrationFinished(true)
        return
      }
      // Getting valid poses
      savedPoses.push({ time: Date.now(), value: pose })
      const validSavedPoses = getValidSavedPoses(savedPoses)
      const description = getPoseInvalidDescription(pose)
      setDebugMsg(`Num valid poses:${validSavedPoses.length}, ${description}`)
      
      // Detecting when calibration is complete
      if (savedPoses.length > 0 && 
          validSavedPoses.length > MIN_VALID_POSES_NEEDED_BEFORE_CALIBRATION) {
        const coords = transformBubbleCoordsToBubbleList(findBubbleCoords(validSavedPoses))
        setBubbleCoords(coords)
        setIsCalibrationFinished(true)
      }
    }

    return (
        <View style={styles.container}>
          <View style={{flexDirection: 'column', width: '100%', height: '100%'}}>
            <View style={{position: 'absolute', marginTop: 120}}>
                <PoseDetect
                filterPose={true}
                onPoseDetected={onPoseDetected}
                onScoreUpdate={() => {}}
                whichCamera={CameraType.front}
                detectLine1={debugMode}
                detectLine2={false}
                nextRound={false}
                roundTimer={null}
                bubblesList={[]}
                changeRound={null}
                />  
            </View>
              <TopBar 
              left={"返回教學"}
              mid={"站位測定"}
              right={""}
              backScreen={5}/>
            <View style={{backgroundColor: 'transparent', flexDirection: 'column', position: 'relative', flex: 1, height: Dimensions.get('screen').height-120, justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flex:1}}>
                {isCalibrationFinished?
                <View style={{marginTop: 20,backgroundColor: 'rgb(235,243,237)', width: (Dimensions.get('screen').width/2/2/2)+(Dimensions.get('screen').width/2), alignItems: 'center'}}>
                  <Text style={{color: 'rgb(54,120,65)', fontSize: 40, padding: 10}}>站位正確，請保持姿勢三秒（0{timeLeft}）</Text>
                </View>
                :
                <View style={{marginTop: 20,backgroundColor: 'rgb(226,237,240)', width: (Dimensions.get('screen').width/2/2)+(Dimensions.get('screen').width/2), alignItems: 'center'}}>
                  {debugMode
                    ? <Text style={{color: 'rgb(41,89,154)', fontSize: 20, padding: 10}}>{debugMsg}</Text>
                    : <TouchableOpacity onPress={() => setDebugMode(true)}>
                        <Text style={{color: 'rgb(41,89,154)', fontSize: 40, padding: 10}}>請擺放裝置在前面，並將身體對準站位線</Text>
                      </TouchableOpacity>
                    }
                </View>
                }
              </View>
              <View style={{flex:6, alignItems: 'center', justifyContent:'center',transform:[{scale:0.63}],width: (Dimensions.get('screen').width/2/2)+(Dimensions.get('screen').width/2)}}>
              <Image source={isCalibrationFinished ? IMG.UPPER_BODY.SUCCESS : IMG.UPPER_BODY.DEFAULT}/>
              </View>
            </View>
          </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'white',
    },
});

export default PoseDetectScreen;