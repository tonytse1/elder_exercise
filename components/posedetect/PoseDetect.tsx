import React, { useState, useEffect, useRef, useContext, useMemo } from 'react';
import {
    View,
    StyleSheet,
    Platform,
    Dimensions,
    Text,
    Animated as ANIM
} from 'react-native';

//Expo
import { CameraType } from 'expo-camera';

// TFCamera
import TFCamera from './TFCamera';

//SVG Animation
import { useSharedValue, useAnimatedStyle, SharedValue, AnimatedStyleProp } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import Svg, { Line, Path, SvgUri } from 'react-native-svg';


//SVG Frame
import Bubbles, { Bubble, BUBBLE_COLOR } from '../svg/Bubbles';
import { isPoseValid } from '../../screens/main/Calibration';
import Scored from '../Animation/Scored';
import { ScoreContext } from '../../store/score-context';

import { Audio } from 'expo-av';

// React useContext
// import { ScoreContext } from '../../store/score-context';
// import ScorePlate from '../Score/ScorePlate';

//SVG Global Variables
const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedPath = Animated.createAnimatedComponent(Path);


export type Pose = {
    nose: { x: number, y: number },
    left_eye: { x: number, y: number },
    right_eye: { x: number, y: number },
    left_ear: { x: number, y: number },
    right_ear: { x: number, y: number },
    left_shoulder: { x: number, y: number },
    right_shoulder: { x: number, y: number },
    left_elbow: { x: number, y: number },
    right_elbow: { x: number, y: number },
    left_wrist: { x: number, y: number },
    right_wrist: { x: number, y: number },
    left_hip: { x: number, y: number },
    right_hip: { x: number, y: number },
    left_knee: { x: number, y: number },
    right_knee: { x: number, y: number },
    left_ankle: { x: number, y: number },
    right_ankle: { x: number, y: number },
}
const usePosition = (pose: SharedValue<Pose>, valueName1: string, valueName2: string) => {
    if (pose.value != null) {
        return useAnimatedStyle<any>(
            () => ({
                x1: pose.value[valueName1].x,
                y1: pose.value[valueName1].y,
                x2: pose.value[valueName2].x,
                y2: pose.value[valueName2].y,
            }),
            [pose],
        );
    } else {
        return useAnimatedStyle<any>(
            () => ({
                x1: pose[valueName1].x,
                y1: pose[valueName1].y,
                x2: pose[valueName2].x,
                y2: pose[valueName2].y,
            }),
            [pose],
        );
    }
};
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

// camera size in imaginary pixel
const cameraWidth = Platform.OS === "ios" ?
    // Math.round(Dimensions.get('window').width * 0.9) :
    screenWidth:
    screenWidth;
const cameraHeight = Platform.OS === "ios" ?
    // Math.round(Dimensions.get('window').height * 0.6) :
    screenHeight-114:
    screenHeight-114;


const PoseDetect: React.FC<{
    onPoseDetected: (pose: Pose) => void,
    onScoreUpdate: (score: number) => void,
    filterPose: boolean,
    whichCamera: CameraType,
    detectLine1,
    detectLine2,
    nextRound,
    roundTimer,
    bubblesList,
    changeRound
}> = ({
    onPoseDetected,
    onScoreUpdate,
    filterPose,
    whichCamera,
    detectLine1,
    detectLine2,
    nextRound,
    roundTimer,
    bubblesList,
    changeRound
}) => {
        var [list, setList] = useState(bubblesList);

        const [showScoreImage, setshowScoreImage] = useState(false);
        const [bubbleUpdate, setBubbleUpdate] = useState(false);
        const scoreCtx = useContext(ScoreContext);
        const bubbleOpacity = useRef(new ANIM.Value(1)).current;


        var [ballTimer1, setBallTimer1] = useState<number>(0)
        var _ballTimer1 = 0
        var [ballCheckTimer1] = useState(0)
        var [ballTimer2, setBallTimer2] = useState<number>(0)
        var _ballTimer2 = 0
        var [ballCheckTimer2] = useState(0)
        
        // Reload the bubbles
        var canReload= false;

        var started = false

        const [soundEffect, setSoundEffect] = useState(null);
        // const [playSound, setPlaySound] = useState(false);
        const [roundChanged, setRoundChanged] = useState(false);
        const [_roundTime, _setRoundTime] = useState(roundTimer)

        const [allowRemove, setAllowRemove] = useState(true)

        var startTime = Date.now(); // set initial elapsed time to 0
      
        const loadSoundEffect = async () => {
          const soundEffectObject = new Audio.Sound();
          try {
            await soundEffectObject.loadAsync(require('../../new_assets/scored_sound.mp3'));
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

        const delay = ms => new Promise(
            resolve => setTimeout(resolve, ms)
          );
        useEffect(() => {
            setList([])
            setRoundChanged(true)
            console.log("Round Changedd!")
            async function reload(){
                setList(updateBubble());
                console.log("List length: "+list.length)
            }
            reload()
        }, [nextRound]) 


        const handleImageRemove = (id) => {
            const changeImage = list.find(bes => bes.bid === id)
            changeImage.showScore = true
            console.log(changeImage.showScore)
            // setList(list)
            const updatedImageList = list.filter((bes) => bes.bid !== id);
            ANIM.timing(bubbleOpacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
              }).start(async () => {
                // const changeImage = bubbles.find(bubble => bubble.id === id)
                // changeImage.showScore = true
                setList(updatedImageList);
                bubbleOpacity.setValue(1);
                changeImage.showScore = false
              });
            return updatedImageList;
        };


        const updateBubble = () => {
            const updateList = bubblesList;
            console.log("UpdateBubble function: " + updateList)
            if(scoreCtx.gameMode === 3 ||scoreCtx.gameMode === 2){
                console.log("Update Bubble: List updated")
                setList(updateList);
            }
            return updateList;
        };
        //performance hacks (Platform dependent)
        const tensorDims = { width: 152, height: 200 };



        const defaultPose: Pose = {
            nose: { x: 0, y: 0 },
            left_eye: { x: 0, y: 0 },
            right_eye: { x: 0, y: 0 },
            left_ear: { x: 0, y: 0 },
            right_ear: { x: 0, y: 0 },
            left_shoulder: { x: 0, y: 0 },
            right_shoulder: { x: 0, y: 0 },
            left_elbow: { x: 0, y: 0 },
            right_elbow: { x: 0, y: 0 },
            left_wrist: { x: 0, y: 0 },
            right_wrist: { x: 0, y: 0 },
            left_hip: { x: 0, y: 0 },
            right_hip: { x: 0, y: 0 },
            left_knee: { x: 0, y: 0 },
            right_knee: { x: 0, y: 0 },
            left_ankle: { x: 0, y: 0 },
            right_ankle: { x: 0, y: 0 },
        };

        // Pose related variables initialising
        const pose = useSharedValue(defaultPose);

        // useEffect(() => {
        //     console.log("PoseDetect useEffect pose", pose);
        // }, [pose]);

        // Coordination of the lines linking body points for SVG drawing 
        const leftWristToElbowPosition = usePosition(pose, 'left_wrist', 'left_elbow');
        const leftElbowToShoulderPosition = usePosition(pose, 'left_elbow', 'left_shoulder');
        const leftShoulderToHipPosition = usePosition(pose, 'left_shoulder', 'left_hip');
        const leftHipToKneePosition = usePosition(pose, 'left_hip', 'left_knee');
        const leftKneeToAnklePosition = usePosition(pose, 'left_knee', 'left_ankle');

        const rightWristToElbowPosition = usePosition(pose, 'right_wrist', 'right_elbow');
        const rightElbowToShoulderPosition = usePosition(pose, 'right_elbow', 'right_shoulder');
        const rightShoulderToHipPosition = usePosition(pose, 'right_shoulder', 'right_hip');
        const rightHipToKneePosition = usePosition(pose, 'right_hip', 'right_knee');
        const rightKneeToAnklePosition = usePosition(pose, 'right_knee', 'right_ankle');

        const shoulderToShoulderPosition = usePosition(pose, 'left_shoulder', 'right_shoulder');
        const hipToHipPosition = usePosition(pose, 'left_hip', 'right_hip');

        // Apple position
        // const [appleCoor, setAppleCoor] = useState<AppleCoor>({ x: 0, y: 0 });
        // const appleCoor = useRef<AppleCoor>({ x: 0, y: 0 });

        // // Score of game
        // // const [score, setScore] = useState<number>(0);
        // // const scoreCtx = useContext(ScoreContext);

        // Apple position listener
        // const onAppleCoorUpdate = (tempAppleCoor: AppleCoor) => {
        //     // console.log("PoseDetect onAppleCoorUpdate appleCoor", tempAppleCoor);
        //     // setAppleCoor(tempAppleCoor);
        //     appleCoor.current = tempAppleCoor
        // }

        //----------------------------------------------------------------------------------------
        // MobileNet tensorflow model classify operation returns an array of prediction objects 
        // with this structure: prediction = [ {"className": "object name", "probability": 0-1 } ]
        // where:
        // className = The class of the object being identified. Currently, this model identifies 1000 different classes.
        // probability = Number between 0 and 1 that represents the prediction's probability 
        // Example (with a topk parameter set to 3 => default):
        // [
        //   {"className":"joystick","probability":0.8070220947265625},
        //   {"className":"screen, CRT screen","probability":0.06108357384800911},
        //   {"className":"monitor","probability":0.04016926884651184}
        // ]
        // In this case, we use topk set to 1 as we are interested in the higest result for
        // both performance and simplicity. This means the array will return 1 prediction only!
        //----------------------------------------------------------------------------------------
        const getPrediction = async (tensor: any, mobilenetModel: any) => {
            if (!tensor) { return; }
            if (mobilenetModel.estimatePoses == null) {
                console.log("TFCamera getPrediction estimatePoses is null");
                return;
            }
            // //topk set to 1, if use mobilenet
            // const prediction = await mobilenetModel.classify(tensor, 1);

            try {

                // if use poseDetection
                const poses = await mobilenetModel.estimatePoses(tensor);
                if (poses.length > 0) {

                    const poseOne = poses[0]
                    // console.log(`poses prediction: ${JSON.stringify(poseOne)}`);

                    var poseCopy: Pose = {
                        nose: { x: 0, y: 0 },
                        left_eye: { x: 0, y: 0 },
                        right_eye: { x: 0, y: 0 },
                        left_ear: { x: 0, y: 0 },
                        right_ear: { x: 0, y: 0 },
                        left_shoulder: { x: 0, y: 0 },
                        right_shoulder: { x: 0, y: 0 },
                        left_elbow: { x: 0, y: 0 },
                        right_elbow: { x: 0, y: 0 },
                        left_wrist: { x: 0, y: 0 },
                        right_wrist: { x: 0, y: 0 },
                        left_hip: { x: 0, y: 0 },
                        right_hip: { x: 0, y: 0 },
                        left_knee: { x: 0, y: 0 },
                        right_knee: { x: 0, y: 0 },
                        left_ankle: { x: 0, y: 0 },
                        right_ankle: { x: 0, y: 0 },
                    };

                    if (poseOne.score > 0.3) {

                        for (let i = 0; i < poseOne.keypoints.length; i++) {
                            poseCopy[poseOne.keypoints[i].name].x = cameraWidth - poseOne.keypoints[i].x * (cameraWidth / tensorDims.width);
                            poseCopy[poseOne.keypoints[i].name].y = poseOne.keypoints[i].y * (cameraHeight / tensorDims.height);
                        }

                        // console.log(`poseCopy: ${JSON.stringify(poseCopy)}`);
                        onPoseDetected(poseCopy);
                        if (filterPose) {
                            poseCopy = isPoseValid(poseCopy) ? poseCopy : pose.value;
                        }
                        // setPostData(JSON.stringify(poseCopy));
                        var cur_timeStamp = Date.now()
                        var elTime = Math.floor((cur_timeStamp - startTime)/1000)
                        if(scoreCtx.gameMode === 1){
                            if(!canReload){
                                console.log("Inside Round Timer: "+elTime%60) // Show the Timer second
                            } else {
                                startTime = Date.now();
                            }
                            async function refresh(){
                                list = []
                                await delay(6000)
    
                                if(canReload){
                                    list = bubblesList
                                    console.log("Reloadedd!!!")
                                }
                                canReload = false
                                startTime = Date.now();
                            }
                            if((elTime%60) === 12){
                                console.log("12s Times Up!!! Refresh!!!")
                                canReload = true
                                refresh();
                            }
                        } else {

                        }
                        list.map((bbes,index) => {
                            if (bbes.bxCoor !== 0 && bbes.byCoor !== 0) {
                                if (((poseCopy.left_wrist.x - 80 <= bbes.bxCoor &&
                                    poseCopy.left_wrist.x + 80 >= bbes.bxCoor &&
                                    poseCopy.left_wrist.y - 80 <= bbes.byCoor &&
                                    poseCopy.left_wrist.y + 80 >= bbes.byCoor) &&
                                    bbes.bxCoor <= screenWidth/2)
                                    ||
                                    ((poseCopy.right_wrist.x - 80 <= bbes.bxCoor &&
                                    poseCopy.right_wrist.x + 80 >= bbes.bxCoor &&
                                    poseCopy.right_wrist.y - 80 <= bbes.byCoor &&
                                    poseCopy.right_wrist.y + 80 >= bbes.byCoor) &&
                                    bbes.bxCoor >= screenWidth/2)
                                ) {

                                    function gameMode1(){
                                        if(allowRemove){
                                            console.log("PoseDetect score!!");
                                            // setScore(prevValue => ++prevValue);


                                            async function showScore() {  
                                                loadSoundEffect();
                                                onScoreUpdate(1);
                                                const newList = handleImageRemove(bbes.bid)
                                                list = newList;
                                                console.log("PoseDetect.tsx: Bubbles ID: "+bbes.bid+" Deleted")
                                                console.log("PoseDetect.tsx: Updated Length: "+newList.length+"\n")
                                            }
                                            showScore();  
        
    
                                        } 

                                        async function reload(){
                                            list = []
                                            setAllowRemove(false)
                                            changeRound()
                                            await delay(6500)
                                            console.log("Refeshed now after change round")
                                            list = updateBubble();
                                            setAllowRemove(true)
                                            startTime = Date.now();
                                        }
                                        if(list.length === 0){
                                            reload()
                                            startTime = Date.now();
                                        }
                                    }

                                    // Game Mode 2
                                    function gameMode2(){
                                        if(allowRemove){
                                            console.log("PoseDetect score!!");
                                            // setScore(prevValue => ++prevValue);

                                            async function showScore() {  
                                                loadSoundEffect();
                                                onScoreUpdate(1);
                                                const newList = handleImageRemove(bbes.bid)
                                                list = newList;
                                                console.log("PoseDetect.tsx: Bubbles ID: "+bbes.bid+" Deleted")
                                                console.log("PoseDetect.tsx: Updated Length: "+newList.length+"\n")
                                            }
                                            showScore();  
        
                                            // const newList = handleImageRemove(bbes.bid)
                                            // list = newList;
                                            // console.log("PoseDetect.tsx: Bubbles ID: "+bbes.bid+" Deleted")
                                            // console.log("PoseDetect.tsx: Updated Length: "+newList.length+"\n")
        
                                            // loadSoundEffect();
                                            // onScoreUpdate(1);
    
                                        }
                                        // async function showScore() {   
                                        //     setshowScoreImage(true);
                                        //     await delay(150);
                                        //     setshowScoreImage(false);
                                        //   }
                                        // showScore();      
                                        async function reload2(){
                                            setAllowRemove(false)
                                            await delay(1000)
                                            console.log("Refeshed now after change round")
                                            const updateList = updateBubble();
                                            list = updateList
                                            setAllowRemove(true)
                                        }
                                        if(list.length === 0){
                                            reload2()
                                        }
                                    }

                                    function gameMode3(){
                                        if(allowRemove && !started){
                                            started == true
                                            console.log(index+ ": Ball "+ bbes.bid +" is touching")
                                            if(bbes.bid === 1){
                                                ballCheckTimer1 = 0
                                                setBallTimer1(prevState => prevState+1)
                                                console.log("Timer 1: "+ballTimer1)
                                                _ballTimer1 = _ballTimer1+1
                                                console.log("Called!!!! _Timer 1: "+_ballTimer1)
                                                if(_ballTimer1 > 130){
                                                    console.log("PoseDetect score!!");
                                                    // setScore(prevValue => ++prevValue);
                
                                                    async function showScore() {  
                                                        loadSoundEffect();
                                                        onScoreUpdate(1);
                                                        const newList = handleImageRemove(bbes.bid)
                                                        list = newList;
                                                        console.log("PoseDetect.tsx: Bubbles ID: "+bbes.bid+" Deleted")
                                                        console.log("PoseDetect.tsx: Updated Length: "+newList.length+"\n")
                                                        setBallTimer1(0)
                                                        _ballTimer1 =0
                                                    }
                                                    showScore();  

                                                }
                                            } else if(bbes.bid === 2){
                                                ballCheckTimer2 = 0
                                                setBallTimer2(prevState => prevState+1)
                                                console.log("Timer 2: "+ballTimer2)
                                                _ballTimer2 = _ballTimer2+1
                                                console.log("Called!!!! _Timer 1: "+_ballTimer2)
                                                if(_ballTimer2 > 130){
                                                    console.log("PoseDetect score!!");
                                                    // setScore(prevValue => ++prevValue);
                
                                                    const newList = handleImageRemove(bbes.bid)
                                                    list = newList;
                                                    console.log("PoseDetect.tsx: Bubbles ID: "+bbes.bid+" Deleted")
                                                    console.log("PoseDetect.tsx: Updated Length: "+newList.length+"\n")
                
                                                    loadSoundEffect();
                                                    onScoreUpdate(1);
                                                    setBallTimer2(0)
                                                }
                                            } 

                                        }
                                        // async function showScore() {   
                                        //     setshowScoreImage(true);
                                        //     await delay(150);
                                        //     setshowScoreImage(false);
                                        //   }
                                        // showScore();     

                                        async function reload(){
                                            list = []
                                            setAllowRemove(false)
                                            changeRound()
                                            await delay(6500)
                                            console.log("Refeshed now after change round")
                                            list = updateBubble();
                                            setAllowRemove(true)
                                            setBallTimer1(0)
                                            ballCheckTimer1 = 0
                                            _ballTimer1=0
                                            setBallTimer2(0)
                                            ballCheckTimer2 = 0
                                            _ballTimer2=0

    
                                            startTime = Date.now();
                                        }
                                        if(list.length === 0){
                                            reload()
                                            startTime = Date.now();
                                        }
                                    }

                                    switch(scoreCtx.gameMode){
                                        case 1:
                                            gameMode1();
                                            break;
                                        case 2:
                                            gameMode3();
                                            break;
                                        case 3:
                                            gameMode2();
                                            break;
                                    }

                                    // scoreCtx.addScore(1);
                                    // score.current = score.current + 1;
                                    
                                } else {
                                    // Game Mode 2 Detect no touch timer
                                    if(scoreCtx.gameMode === 2){

                                        if(_ballTimer1 > 0 && bbes.bid === 1){
                                            ballCheckTimer1 = ballCheckTimer1 +1
                                            console.log(ballCheckTimer1)
                                            if(ballCheckTimer1 > 30){
                                                setBallTimer1(0)
                                                _ballTimer1=0
                                                ballCheckTimer1 = 0
                                            }
                                        } else if(_ballTimer2 > 0 && bbes.bid === 2){
                                            ballCheckTimer2 = ballCheckTimer2 +1
                                            console.log(ballCheckTimer2)
                                            if(ballCheckTimer2 > 30){
                                                setBallTimer2(0)
                                                _ballTimer2=0
                                                ballCheckTimer2 = 0
                                            }
                                        }
                                        // ballTimer1 = 0
                                        // Reset the timer
                                        // clearInterval(checkTwoS.current);
                                        // console.log(bbes.bid+" is not touching")
                                    }
                                }
                            }
                        })
                        pose.value = poseCopy;
                        return true;

                        
                
                    } else {

                        pose.value = poseCopy;
                        return true;
                    }

                }

            } catch (err) {
                console.log("PoseDetectScreen getPrediction Error", err);

                return false;
            }

            // Run inference and get output tensors.
            // let prediction = tfliteModel.predict(tensor);

            // console.log(`prediction: ${JSON.stringify(prediction)}`);

            // if (!prediction || prediction.length === 0) { return; }

            // //only attempt translation when confidence is higher than 20%
            // if (prediction[0].probability > 0.3) {

            //   //stop looping!
            //   cancelAnimationFrame(requestAnimationFrameId);
            //   setPredictionFound(true);

            //   //get translation!
            //   // await getTranslation(prediction[0].className);
            //   console.log("prediction no.1 ", prediction[0].className);
            // }
        }
        return (
            <View style={styles.body}>
                {useMemo(() => <TFCamera
                    getPrediction={getPrediction}
                    whichCamera={whichCamera}
                    roundTimer={roundTimer}
                />, [whichCamera, filterPose])}
                <View style={Platform.OS === "ios" ? {...styles.svgView, transform: [{scaleX:-1}]} :{...styles.svgView}}>
                {detectLine1?
                    <Svg
                        height={cameraHeight}
                        width={cameraWidth}
                        style={styles.linesContainer}>
                        <AnimatedLine animatedProps={leftWristToElbowPosition} stroke="blue" strokeWidth="6" />
                        <AnimatedLine animatedProps={leftElbowToShoulderPosition} stroke="red" strokeWidth="6" />
                        <AnimatedLine animatedProps={leftShoulderToHipPosition} stroke="green" strokeWidth="6" />
                        <AnimatedLine animatedProps={leftHipToKneePosition} stroke="yellow" strokeWidth="6" />
                        <AnimatedLine animatedProps={leftKneeToAnklePosition} stroke="aqua" strokeWidth="6" />
                        <AnimatedLine animatedProps={rightWristToElbowPosition} stroke="purple" strokeWidth="6" />
                        <AnimatedLine animatedProps={rightElbowToShoulderPosition} stroke="brown" strokeWidth="6" />
                        <AnimatedLine animatedProps={rightShoulderToHipPosition} stroke="chartreuse" strokeWidth="6" />
                        <AnimatedLine animatedProps={rightHipToKneePosition} stroke="black" strokeWidth="6" />
                        <AnimatedLine animatedProps={rightKneeToAnklePosition} stroke="darkblue" strokeWidth="6" />
                        <AnimatedLine animatedProps={shoulderToShoulderPosition} stroke="darkorange" strokeWidth="6" />
                        <AnimatedLine animatedProps={hipToHipPosition} stroke="deeppink" strokeWidth="6" />
                    </Svg>
                :null}
                {detectLine2?
                <Svg
                    height={cameraHeight}
                    width={cameraWidth}
                    style={styles.linesContainer}>
                    <AnimatedLine animatedProps={leftWristToElbowPosition} stroke="black" strokeWidth="6" />
                    <AnimatedLine animatedProps={leftElbowToShoulderPosition} stroke="red" strokeWidth="6" />
                    <AnimatedLine animatedProps={rightWristToElbowPosition} stroke="purple" strokeWidth="6" />
                    <AnimatedLine animatedProps={rightElbowToShoulderPosition} stroke="brown" strokeWidth="6" />
                    <AnimatedLine animatedProps={shoulderToShoulderPosition} stroke="darkorange" strokeWidth="6" />
                </Svg>:null}
                </View>
                <Bubbles bubbles={list} timer1={ballTimer1} timer2={ballTimer2} gameMode={scoreCtx.gameMode}/>
            </View>
            
        );
    }


const styles = StyleSheet.create({
    body: {
        // padding: 5,
        // paddingTop: 25,
        backgroundColor: 'green',
        // flex: 1,
        width: cameraWidth,
        height: cameraHeight,
    },
    cameraView: {
        // display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: cameraWidth,
        height: cameraHeight,
        // paddingTop: 10,
        zIndex: -0.1,
        backgroundColor: 'black',
    },
    svgView: {
        position: 'absolute',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: cameraWidth,
        height: cameraHeight,
        zIndex: 0.1,
        // backgroundColor: 'green',
    },
    camera: {
        width: cameraWidth,
        height: cameraHeight,
        zIndex: -0.1,
        borderWidth: 0,
        borderRadius: 0,
        // backgroundColor: 'green',
    },
    linesContainer: {
        // position: 'absolute',
        top: 0,
        left: 0,
        height: cameraHeight,
        width: cameraWidth,
        zIndex: 0.1,
        // backgroundColor: 'green',
    },
    appleSvgView: {
        position: 'absolute',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: cameraWidth,
        height: cameraHeight,
        zIndex: 0.1,
        // backgroundColor: 'transparent',
    },
    appleContainerView: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: 30,
        height: 31,
        top: 0,
        left: 0,
        zIndex: 0.1,
        // backgroundColor: 'transparent',
    },
    appleContainer: {
        // position: 'absolute',
        top: 0,
        left: 0,
        height: 31,
        width: 30,
        zIndex: 0.2,
        // backgroundColor: 'green',
    },
});

export default PoseDetect;