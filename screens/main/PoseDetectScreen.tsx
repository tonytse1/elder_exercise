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
    TouchableOpacity
} from 'react-native';

//Expo
import Constants from 'expo-constants';
import { CameraType } from 'expo-camera';

//Components
// import PoseDetectManager, { Pose } from '../../components/posedetect/PoseDetectManager';
import PoseDetect, { Pose } from '../../components/posedetect/PoseDetect';
import { getPoseInvalidDescription } from './Calibration';
import ScorePlate from '../../components/score/ScorePlate';
import MainButton from '../../components/Buttons/MainButton';
import CountdownTimer from '../../components/Timer/CountdownTimer';
import Stopwatch from '../../components/Timer/Stopwatch';
import MonkeyClimbing from '../../components/Animation/MonkeyClimbing';

// React useContext
import { ScoreContext } from '../../store/score-context';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { max, Value } from 'react-native-reanimated';
import Scored from '../../components/Animation/Scored';
import { update } from '@tensorflow/tfjs-layers/dist/variables';
import ChangeRound from './ChangeRound';
import { TopBar } from './Topbar';
import EndExerciseScreen from './EndExerciseScreen';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const PoseDetectScreen: React.FC = () => {

    const [finishTime, setFinishTime] = useState(new Date(new Date().valueOf()));

    const [isTimerOn, setIsTimerOn] = useState(false);
    const [line1, setLine1] = useState(false);
    const [line2, setLine2] = useState(false);
    const [filterMode, setFilterMode] = useState(false);

    const [score, setScore] = useState<number>(0);
    const [gameScore, setGameScore] = useState<number>(0);
    const scoreCtx = useContext(ScoreContext);
    const bubblesList = scoreCtx.bubbleList;
    // const score = useRef<number>(0);

    const [notice, setNotice] = useState<string>("");
    const [gameRunning, setGameRunning] = useState<boolean>(true);
    const [nextRound, setNextRound] = useState(false); // Change Round
    const [nextRoundMsg, setNextRoundMsg] = useState(false); // Show Next Round Image
    const [endExercise, setEndExercise] = useState(false); // Show Next Round Image
    // const [isCameraOpen, setIsCameraOpen] = useState<boolean>(true);
    const [gameCounter, setGameCounter] = useState<number>(0);
    const [debugMsg, setDebugMsg] = useState("")

    const [whichCamera, setWhichCamera] = useState<CameraType>(CameraType.front)

    const [round, setRound] = useState(1);
    const [maxRound, setMaxRound] = useState(scoreCtx.maxRound);
    const roundScore = scoreCtx.roundScore;

    const [scoreWidth, setScoreWidth] = useState<number>(100/(roundScore*maxRound));
    // Initializing Game
    useEffect(() => {
        console.log("PoseDetectScreen.tsx: Game initializing")
        console.log("Width: "+screenWidth)
        console.log("Height: "+screenHeight)
        setRound(1);
        async function initial(){
            setNextRoundMsg(true);
            delay(3000)
            setNextRoundMsg(false);
            delay(100)
            handleTimerStart();
            handleRoundTimerStart();
        }
        if(gameRunning){
            initial()
        }
    }, [])

    // Delay for some seconds
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

    const changeRound = () => {
        handleRoundTimerStop();
        handleTimerStop();
        // setRound(round+1)
        async function showRoundImage(){
            await delay(2000)
            setRound(prevState => prevState +1)
            if(round <= maxRound){
                setNextRoundMsg(true);
            }
            await delay(3000)
            if(round <= maxRound){
                setNextRoundMsg(false);
            }
            console.log("Round Image Shown")
            setNextRound(true)
            await delay(1000)
            setRoundTimer(12)
            handleTimerStart();
            handleRoundTimerStart();
            setNextRound(false)
        }
        if(round < maxRound && gameRunning){
            showRoundImage();
            console.log("Round now: "+round)
        }
    }

    useEffect(() => {
        if(round>maxRound || gameScore >= maxRound*roundScore){
            setGameRunning(false)
        }
        if(round<=maxRound){
            console.log("Round: " + round + " Start!")
        }
    }, [round])

    useEffect(()=>{
        console.log("Current Score: " + gameScore)
        setScoreWidth(100/(roundScore*maxRound)*gameScore);
        if(gameScore>=maxRound*roundScore){
            setGameRunning(false)
            
        }
    },[gameScore])

 

    useEffect(() => {
        if (notice !== "") {
            console.log("Alert CameraScreen", notice);
            Alert.alert("Congratulations", notice, [{
                text: "OK", onPress: () => {
                    setNotice("");
                    setGameCounter(0);
                    setGameRunning(false)
                    scoreCtx.setScreen(0);
                }
            }]);
        }
    }, [notice]);

    const onPoseDetected = (pose: Pose) => {
        const description = getPoseInvalidDescription(pose)
        setDebugMsg(description)
      }
    const [time, setTime] = useState(60);
    const intervalRef = useRef(null);

    const [roundTimer, setRoundTimer] = useState(12);
    const intervalRef1 = useRef(null);

    const [isRunning, setIsRunning] = useState(false);
  
    const handleTimerStart = () => {
        if (gameRunning) {
            console.log("Timer Start!")
            intervalRef.current = setInterval(async () => {
                setTime(_time => _time - 1);
            }, 1000);
        }
    };

    const handleRoundTimerStart = () => {
        if (gameRunning) {
            console.log("Round Timer Start!")
            intervalRef1.current = setInterval(() => {
              setRoundTimer(roundTimer => roundTimer - 1);
            }, 1000);
        }
      };
  
    const handleTimerStop = () => {
        console.log("Timer Stopped")
        setIsRunning(false);
        clearInterval(intervalRef.current);
    };

    const handleRoundTimerStop = () => {
        console.log("Round Timer Stopped")
        clearInterval(intervalRef1.current);
      };
    

    useEffect(()=>{
        console.log('Time now: '+time)
        if(time === 0){
            setGameRunning(false);
        } 
    }, [time])

    useEffect(()=>{
        if(gameRunning === false){
            handleTimerStop();
            handleRoundTimerStop();
            async function end(){
                await delay(1000)
                setEndExercise(true)
            }
            end()
        }
    }, [gameRunning])

    useEffect(()=>{
        console.log('Round Time now: '+roundTimer)
        if(roundTimer === 0 && round < maxRound && scoreCtx.gameMode === 1){
            changeRound();
        }
        if(time<0 || roundTimer ==0 && round==maxRound && scoreCtx.gameMode === 1){
            setGameRunning(false)
            setTime(0)
            clearInterval(intervalRef.current)
            setRoundTimer(0)
            clearInterval(intervalRef1.current)
        }
    }, [roundTimer])
  
    const formatTime = (time) => {
      const min = Math.floor(time / 60);
      const sec = time-min*60;
      // return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
      return `${min < 10?'0':''}${min}:${sec < 10?'0':''}${sec}`;
    };


    const onScoreUpdate = (tempScore: number) => {
        console.log('PoseDetectScreen onScoreUpdate score', tempScore);
        setScore(prevValue => tempScore + prevValue);
    };

    useEffect(() => {
        
        if (score != 0) {
            if (gameRunning) {
                setGameScore(prevValue => prevValue + 1);
            }
        } 
        else {
            setGameScore(0);
        }
    }, [score]);

    // useEffect(() => {
    //     if (gameCounter >= 100) {
    //         setGameCounter(0);
    //         scoreCtx.setScreen(0);
    //     }
    // }, [gameCounter]);

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            {gameRunning?
            <View>
                <TopBar 
                left={"返回主頁"}
                mid={(line1 || line2) ? debugMsg : "肩膊 - 打橫舉至盡"}
                right={"教學"}
                backScreen={0}/>
                <View>
                    <PoseDetect
                        filterPose={filterMode}
                        onPoseDetected={onPoseDetected}
                        onScoreUpdate={onScoreUpdate}
                        whichCamera={whichCamera}
                        detectLine1={line1}
                        detectLine2={line2}
                        nextRound={nextRound}
                        roundTimer={roundTimer}
                        bubblesList={bubblesList}
                        changeRound={changeRound}
                    />
                        {/* Title Bar */}
                        <View style={{position: 'absolute', flexDirection: 'row', width: screenWidth-100, height:80,backgroundColor:'transparent', borderRadius: 15, borderWidth: 0, borderColor: 'black', marginTop: 10, marginLeft: 50}}>
                            {/* BackMenu
                            <View style={{flex:1,justifyContent:'center'}}>
                                <TouchableOpacity onPress={()=>{{setGameRunning(false);scoreCtx.setScreen(0)}}}>
                                    <ArrowLeftIcon size={50} color='white'/>
                                </TouchableOpacity>
                            </View> */}
        
                            <View style={{flex:1,justifyContent:'center'}}>
                                <View style={styles.progressBar}>
                                    <TouchableOpacity onPress={function(){
                                            setLine1(false);
                                            setLine2(!line2);
                                            setFilterMode(!filterMode)
                                        }} style={styles.progressBarContainer}>
                                        {/* <Text onPress={()=>{setLine(!line)}} style={{color:'black', fontSize: 22, position: 'absolute', textAlign:'center', fontWeight: 'bold', width: '100%'}}>
                                            {round} / 5 回合
                                        </Text> */}
                                        {gameScore===maxRound*roundScore?
                                        <View style={{...styles.loadingDone, width: '100%'}}>
                                            <Text style={{position: 'absolute'}}>{gameScore}</Text>
                                        </View>:
                                        <View style={{...styles.loading, width: scoreWidth+"%"}}>
                                            <Text style={{position: 'absolute'}}>{gameScore}</Text>
                                        </View>
                                        }
                                    </TouchableOpacity>
                                </View>  
                            </View>
                            
                            {/* Progress Bar */}
                            <View style={{flex:2,justifyContent:'center'}}>
                                    <View style={styles.progressBarContainer}>
                                        <Text onPress={function(){
                                            setLine2(false);
                                            setLine1(!line1)
                                        }} style={{color:'white', fontSize: 32, position: 'absolute', textAlign:'center', fontWeight: 'bold', width: '100%', marginLeft: 70}}>
                                            {round} / {maxRound} 回合
                                        </Text>
                                    </View>
                            </View>
        
        
                            {/* Timer */}
                            <View style={{flex:1,justifyContent:'center'}}>
                                <Text style={{...styles.time, textAlign:'right', marginRight: 10}}>{formatTime(time)}</Text>
                            </View>
        
                        </View>
                </View>
            </View>
            :
            <View style={{width: screenWidth, height: screenHeight-114}}></View>
            }
                {/* Change Round */}
                {nextRoundMsg&&gameRunning?
                <ChangeRound 
                round={round}
                maxRound={maxRound}/>
                :
                null
                }
                {endExercise?<EndExerciseScreen />:null}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    progressBar: {
        height: 65,
        width: 300,
        position: 'absolute',
        backgroundColor: 'lightgrey',
        borderColor: 'lightgrey',
        flexDirection:'row',
        alignContent: 'flex-start',
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 15,
    },
    progressBarContainer: {
        height: 50,
        width: 260,
        marginTop: 3,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 2,
        borderRadius: 15,
        alignSelf: 'center',
        position: 'relative',
        alignContent: 'center',
        justifyContent: 'center',
        margin: 0,
    },
    loading: {
        backgroundColor: 'darkgrey',
        position: 'absolute',
        height: 45,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 15,
        borderColor: 'darkgrey',
    },
    loadingDone: {
        backgroundColor: 'darkgrey',
        height: 45,
        position: 'absolute',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderRadius: 15,
        borderColor: 'darkgrey',
    },
    time: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
      },
});

export default PoseDetectScreen;