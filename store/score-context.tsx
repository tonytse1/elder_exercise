import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { BUBBLE_COLOR } from '../components/svg/Bubbles';

// App default configurations
const RUN_APP_CONFIG = {
    isRealCalibration: false, // Is real calibration used?
    isDebugMode: false, // Is pose lines shown during calibration?
    useCalibratedBubbleList: false, // Are the bubble positions calculated from calibration used for the exercises?
}

type ScoreContextObj = {
    calibratedBubbleList: any[];
    setCalibratedBubbleList: (bubbleCoords: any[]) => void;
    setGame: (exID: number, gameID: number, gameMode: number) => void,
    gameID: number,
    whichScreen: number;
    setScreen: (whichScreen: number) => void;
    bubbleList: object;
    maxRound: number,
    roundScore: number,
    setCount: (_count: number) => void,
    exIDCount: number,
    gameCount: number,
    gameMode: number,
    runAppConfig: any,
}

export const ScoreContext = React.createContext<ScoreContextObj>({
    // Score: 0,
    // addScore: () => { },
    calibratedBubbleList: [],
    setCalibratedBubbleList: () => {},
    setGame: () => { },
    gameID: 0,
    whichScreen: 0,
    setScreen: () => {},
    bubbleList: [],
    maxRound: 5,
    roundScore: 4,
    setCount: () => {},
    exIDCount: 0,
    gameCount: 0,
    gameMode: 0,
    runAppConfig: {},
});

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const bubbles = [
    {exID:1, gameID: 38, bid:1, bxCoor:(screenWidth/2-400), byCoor:(screenHeight/2-90), color: BUBBLE_COLOR.BLUE, maxRound: 5, showScore: false},
    {exID:1, gameID: 38, bid:2, bxCoor:(screenWidth/2+300), byCoor:(screenHeight/2-90), color: BUBBLE_COLOR.ORANGE,maxRound: 5, showScore: false},
    {exID:1, gameID: 38, bid:3, bxCoor:(screenWidth/2-350), byCoor:(screenHeight/2+30), color: BUBBLE_COLOR.BLUE,maxRound: 5, showScore: false},
    {exID:1, gameID: 38, bid:4, bxCoor:(screenWidth/2+250), byCoor:(screenHeight/2+30), color: BUBBLE_COLOR.ORANGE,maxRound: 5, showScore: false},
    {exID:1, gameID: 40, bid:1, bxCoor:(screenWidth/2-400), byCoor:(screenHeight/2-90), color: BUBBLE_COLOR.PURPLE,maxRound: 1, showScore: false},
    {exID:1, gameID: 40, bid:2, bxCoor:(screenWidth/2+300), byCoor:(screenHeight/2-90), color: BUBBLE_COLOR.BLUE,maxRound: 1, showScore: false},
    {exID:1, gameID: 39, bid:1, bxCoor:(screenWidth/2-400), byCoor:(screenHeight/2-90), color: BUBBLE_COLOR.BLUE, maxRound: 5, showScore: false},
    {exID:1, gameID: 39, bid:2, bxCoor:(screenWidth/2+300), byCoor:(screenHeight/2-90), color: BUBBLE_COLOR.BLUE, maxRound: 5, showScore: false},
    // {bid:5, bxCoor:(screenWidth/2-430), byCoor:(screenHeight/2-210), color: url_blue},
    // {bid:6, bxCoor:(screenWidth/2+330), byCoor:(screenHeight/2-210), color: url_orange}
];

const ScoreContextProvider: React.FC<{children: any}> = (props) => {
    const [gameID, setGameID] = useState<number>(0);
    const [gameMode, setGameMode] = useState<number>(0);
    const [maxRound, setMaxRound] = useState<number>(5);
    const [exIDCount, setExIDCount] = useState<number>(0);
    const [roundScore, setRoundScore] = useState<number>(0);
    const [whichScreen, setWhichScreen] = useState<number>(0);
    const [gameCount, setGameCount] = useState<number>(0);
    const [bubblesList, setBubbleList] = useState([])
    const [calibratedBubbleList, setCalibratedBubbleList] = useState<any>([])

    useEffect(()=>{
        if(gameID != 0) {
            const returnGame = bubbles.filter(bubble => bubble.gameID === gameID)
            var bubbleData;
            if (calibratedBubbleList.length > 0 && RUN_APP_CONFIG.useCalibratedBubbleList) {
                console.log("Bubble coords detected!")
                bubbleData = calibratedBubbleList
            } else {
                console.log("Default bubbles used!")
                bubbleData = returnGame
            }
            console.log("bubbleData", bubbleData)
            setBubbleList(bubbleData)
            if(gameMode === 2){
                setRoundScore(2)
            } else if(gameMode === 1){
                setRoundScore(4)
            } else if(gameMode === 3){
                setRoundScore(60)
            }
            console.log("Round score: "+roundScore)
            console.log("Score Context: Bubble List Length - "+bubblesList.length)
            setMaxRound(bubbleData[0].maxRound)
        }
    }, [calibratedBubbleList])

    useEffect(()=>{
        if(gameCount > 3){
            setGameCount(0)
        }
        if(gameCount <= 3){
            console.log("Current game Count: "+ gameCount)
        }
    }, [gameCount])

    const setScreen = (_whichScreen: number) => {
        console.log("score-context setScreen _whichScreen", _whichScreen);
        console.log("score-context setScreen whichScreen", whichScreen);
        setWhichScreen(_whichScreen);
    }

    const uniqueGameIdsByExId = bubbles.reduce((acc, curr) => {
        if (!acc[curr.exID]) {
          acc[curr.exID] = new Set();
        }
        acc[curr.exID].add(curr.gameID);
        return acc;
      }, {});

    const setGame = (_exID: number, _gameID: number, gameMode: number) => {
        const checkEmpty = bubbles.filter(bubble => bubble.gameID === _gameID)
        if(checkEmpty.length != 0){
            console.log(_exID)
            const numberOfGame = uniqueGameIdsByExId[_exID].size
            setExIDCount(numberOfGame)
            setGameID(_gameID);
            setGameMode(gameMode);
            setGameCount(prevState => prevState+1)
        } else {
            setScreen(0)
        }
    }

    const setCount = (_count) => {
        setGameCount(_count)
    }

    const contextValue: ScoreContextObj = {
        setCalibratedBubbleList: setCalibratedBubbleList,
        calibratedBubbleList: calibratedBubbleList,
        setGame: setGame,
        gameID: gameID,
        whichScreen: whichScreen,
        setScreen: setScreen,
        bubbleList: bubblesList,
        maxRound: maxRound,
        roundScore: roundScore,
        exIDCount: exIDCount,
        gameCount: gameCount,
        setCount: setCount,
        gameMode: gameMode,
        runAppConfig: RUN_APP_CONFIG,
    }

    return <ScoreContext.Provider value={contextValue}>{props.children}</ScoreContext.Provider>
}

export default ScoreContextProvider;