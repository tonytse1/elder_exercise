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
    TextInput,
    TouchableWithoutFeedback,
    Button,
    Pressable,
    ScrollView
} from 'react-native';
import { HomeIcon } from 'react-native-heroicons/solid';


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
const screenHeight = Dimensions.get('screen').height;

const HomeScreen: React.FC = () => {
    const scoreCtx = useContext(ScoreContext);

    const onStartButtonPressed = () => {
        try {
            scoreCtx.setScreen(0);
        } catch (error) {
            console.log("HomeScreen.tsx: Error discovered: "+error)
        }
    };
    const onStartButtonPressed1 = () => {
        try {
            scoreCtx.setScreen(1);
        } catch (error) {
            console.log("HomeScreen.tsx: Error discovered: "+error)
        }
    };

    const [btnClicked,setBtnClicked] = React.useState(1);
    const img1 = require("../../new_assets/1_Landing_page/2_Tab_bar/Tab1_1x2.png");
    const img2 = require("../../new_assets/1_Landing_page/2_Tab_bar/Tab2_1x2.png");
    const img3 = require("../../new_assets/1_Landing_page/2_Tab_bar/Tab3_1x2.png");
    const img4 = require("../../new_assets/1_Landing_page/2_Tab_bar/Tab4_1x2.png");
    const img1a = require("../../new_assets/1_Landing_page/2_Tab_bar/Tab1_1x1.png");
    const img2a = require("../../new_assets/1_Landing_page/2_Tab_bar/Tab2_1x1.png");
    const img3a = require("../../new_assets/1_Landing_page/2_Tab_bar/Tab3_1x1.png");
    const img4a = require("../../new_assets/1_Landing_page/2_Tab_bar/Tab4_1x1.png");

    const act1Image = require("../../new_assets/1_Landing_page/3_Card/cards/a1.png");
    const act2Image = require("../../new_assets/1_Landing_page/3_Card/cards/a2.png");
    const act3Image = require("../../new_assets/1_Landing_page/3_Card/cards/a3.png");
    const act4Image = require("../../new_assets/1_Landing_page/3_Card/cards/b1.png");
    const act5Image = require("../../new_assets/1_Landing_page/3_Card/cards/b2.png");
    const act6Image = require("../../new_assets/1_Landing_page/3_Card/cards/b3.png");
    const act7Image = require("../../new_assets/1_Landing_page/3_Card/cards/b4.png");
    const act8Image = require("../../new_assets/1_Landing_page/3_Card/cards/b5.png");
    const act9Image = require("../../new_assets/1_Landing_page/3_Card/cards/b6.png");
    const act10Image = require("../../new_assets/1_Landing_page/3_Card/cards/c1.png");
    const act11Image = require("../../new_assets/1_Landing_page/3_Card/cards/c2.png");
    const act12Image = require("../../new_assets/1_Landing_page/3_Card/cards/c3.png");
    const act13Image = require("../../new_assets/1_Landing_page/3_Card/cards/c4.png");
    const act14Image = require("../../new_assets/1_Landing_page/3_Card/cards/c5.png");
    const act15Image = require("../../new_assets/1_Landing_page/3_Card/cards/c6.png");
    const act16Image = require("../../new_assets/1_Landing_page/3_Card/cards/c7.png");
    const act17Image = require("../../new_assets/1_Landing_page/3_Card/cards/c8.png");
    const act18Image = require("../../new_assets/1_Landing_page/3_Card/cards/c9.png");
    const act19Image = require("../../new_assets/1_Landing_page/3_Card/cards/c10.png");
    const act20Image = require("../../new_assets/1_Landing_page/3_Card/cards/c11.png");
    const act21Image = require("../../new_assets/1_Landing_page/3_Card/cards/d1.png");
    const act22Image = require("../../new_assets/1_Landing_page/3_Card/cards/d2.png");
    const act23Image = require("../../new_assets/1_Landing_page/3_Card/cards/d3.png");

    const [imglink1,setimglink1] = React.useState(img1a);
    const [imglink2,setimglink2] = React.useState(img2);
    const [imglink3,setimglink3] = React.useState(img3);
    const [imglink4,setimglink4] = React.useState(img4);

    const [favItems, setfavItems] = useState([]);
    const [favItems1, setfavItems1] = useState([]);

    const [isFav, setFavState] = React.useState(false);

    var favouriteSaved = [];

    useEffect(() => {
    }   , [favItems1]);

    const btnclick0 =()=>
    {
        setBtnClicked(1);
        setimglink1(img1a);
        setimglink2(img2);
        setimglink3(img3);
        setimglink4(img4);
    }
    const btnclick1 =()=>
    {
        setBtnClicked(2);
        setimglink1(img1);
        setimglink2(img2a);
        setimglink3(img3);
        setimglink4(img4);
    }
    const btnclick2 =()=>
    {
        setBtnClicked(3);
        setimglink1(img1);
        setimglink2(img2);
        setimglink3(img3a);
        setimglink4(img4);
    }
    const btnclick3 =()=>
    {
        setBtnClicked(0);
        setimglink1(img1);
        setimglink2(img2);
        setimglink3(img3);
        setimglink4(img4a);
    }

    const ChoosenActivityView = () =>{
        if(btnClicked == 1)
        {
            return <ActivityListToday />
        }
        else if(btnClicked ==2)
        {
            return <ActivityListAll />
        }
        else if(btnClicked ==3)
        {
            return <FavouriteList />
        }
        else 
        {
            return <ActivityListEmpty />
        }
    }

    const ActivityList = () =>{
        return(<ScrollView contentInset={{top:0,bottom:1500}} contentContainerStyle={{flexGrow:screenHeight}} style={{flexDirection: 'row',width:1120} }>
                    <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/Container_1x.png")}/>
                    <View style={{flexDirection: 'column', position: 'absolute', justifyContent: 'center', marginTop: 10, width: 1112, flex:1}}>
                        <View style={{width: '98.5%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                            <TouchableOpacity>
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex1.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex2.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex3.png")}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: '98.5%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                            <TouchableOpacity>
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex0.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex0.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex0.png")}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'98.5%', height:20}}></View>
                        <View style={{width: '98.5%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                            <TouchableOpacity>
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex1.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex2.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex3.png")}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: '98.5%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                            <TouchableOpacity>
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex0.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex0.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex0.png")}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'98.5%', height:20}}></View>
                        <View style={{width: '98.5%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                            <TouchableOpacity>
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex1.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex2.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex3.png")}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: '98.5%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                            <TouchableOpacity>
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex0.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex0.png")}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex0.png")}/>
                            </TouchableOpacity>
                        </View>
                        {/*
                        <View style={{width: '98.5%', flexDirection: 'row', alignSelf: 'center', height: 100, flex:1}}>
                            <TouchableOpacity style={styles.bodyPart}>
                                <Text style={{textAlign: 'center', color: 'white', fontSize: 34}}>肩膊</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bodyPart}>
                                <Text style={{textAlign: 'center', color: 'white', fontSize: 34}}>腰背及全身</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bodyPart}>
                                <Text style={{textAlign: 'center', color: 'white', fontSize: 34}}>手部</Text>  
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Alert.alert('Simple Button pressed')} style={styles.bodyPart}>
                                <Text  style={{textAlign: 'center', color: 'white', fontSize: 34}}>頭頸</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bodyPart}>
                                <Text style={{textAlign: 'center', color: 'white', fontSize: 34}}>臉部</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bodyPart}>
                                <Text style={{textAlign: 'center', color: 'white', fontSize: 34}}>手部</Text>  
                            </TouchableOpacity>
                        </View>
                         */}
                        {/* Exercise Card */}
                        <View style={{width: '98%',backgroundColor: 'green', alignSelf: 'center', flex:4}}>
                            
                        </View>
                    </View>
                </ScrollView>);
    }

    const ActivityListEmpty= () =>{
        return(
            <ScrollView contentContainerStyle={{flexGrow:1,height:1000,width:screenWidth,alignItems:'center'}}>
                <View style={{flexDirection: 'column', position: 'absolute', justifyContent: 'center', marginTop: 10, width: 1112, flex:1}}>
                                
                </View>
            </ScrollView>
        )
    }

    function groupBy(arr, n) {
        var group = [];
        for (var i = 0, end = arr.length / n; i < end; ++i)
          group.push(arr.slice(i * n, (i + 1) * n));
        return group;
    }

    function setFavourite(exID,mode){
        var currentFavArray = [];
        if(JSON.parse(localStorage.getItem('favItems'))!=null)
        { 
        currentFavArray = JSON.parse(localStorage.getItem('favItems'));
        }
        if(currentFavArray.includes(exID*3+mode)==true)
        {

        }
        else{
            currentFavArray.push(exID*3+mode);
        }
        setfavItems1(currentFavArray);
        localStorage.setItem('favItems', JSON.stringify(currentFavArray));
    }

    const removeFavourite= () =>{
        setfavItems([]);
        localStorage.setItem('favItems', JSON.stringify(favItems));
    }

    const checkFav =(exID,mode) =>
    {
        var currentFavArray = [];
        if(JSON.parse(localStorage.getItem('favItems'))!=null)
        { 
        currentFavArray = JSON.parse(localStorage.getItem('favItems'));
        if(currentFavArray.includes(exID*3+mode)==true)
        {
            return true;
        }
        else{
            return false;
        }
        }
        else{
            return false;
        }
    }

    const Image0 =()=>{
        return <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/heart0.png")}/>
    }
    const Image1 =()=>{
        return <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/heart1.png")}/>
    }

    function FavouriteList(){
        console.log(favouriteSaved);
        var favNumber = [];
        if(JSON.parse(localStorage.getItem('favItems'))!=null)
        {
            favNumber = JSON.parse(localStorage.getItem('favItems'));
        }
        console.log(favNumber);
        const actNameAll = ["頸部 - 向左及向右側","頸部 - 前屈後仰","頸部 - 旋轉動作",
        "手臂 - 屈曲動作","手腕 - 向上及向下屈曲","前臂 - 向上及向下動作","前臂 - 反手動作","手部 - 手掌握拳","手部 - 拍手",
        "肩膊 - 向上拉至盡","肩膊 - 握毛巾向上推","肩膊 - 向後伸展","肩膊 - 打橫舉至盡","肩膊 - 手臂向內移動","肩膊 - 手臂向外移動","肩膊 - 抹窗動作","肩膊 - 伸展動作","肩膊 - 向橫打開","肩膊 - 舉重動作","肩膊 - 畫圈動作",
        "腰背 - 伸展運動","腰背 - 轉動運動","全身 - 企坐動作"];
        const ImageArray = [act1Image,act2Image,act3Image,act4Image,act5Image,act6Image,act7Image,act8Image,act9Image,act10Image,act11Image,act12Image,act13Image,act14Image,act15Image,act16Image,act17Image,act18Image,act19Image,act20Image,act21Image,act22Image,act23Image];
        var text1a = "幅度練習";
        var text1b = "力量練習";
        var text1c = "速度練習";

        var getNameFromArray = [];
        var typeArray = [];
        for(var i=0;i<favNumber.length;i++)
        {
            typeArray.push(Math.floor(favNumber[i]%3));
        }
        for(var i=0;i<favNumber.length;i++)
        {
            getNameFromArray.push(Math.floor(favNumber[i]/3));
        }

        const FavArray =[];
        const newActName = groupBy(getNameFromArray,3);
        const newTypeArray = groupBy(typeArray,3);
        console.log("array:",newActName, newTypeArray);

        var scrollHeight = 550*newActName.length+150;
        var scrollWidth = screenWidth;

        newActName.forEach((activity,i)=>
        {
            var array =[];
            array = activity;
            if(array.length==1){
                var exerciseText1 = text1a;
                if(newTypeArray[i][0]==0)
                {
                    exerciseText1 = text1a;
                }
                else if(newTypeArray[i][0]==1)
                {
                    exerciseText1 = text1b;
                }
                else if(newTypeArray[i][0]==2)
                {
                    exerciseText1 = text1c;
                }
                FavArray.push( 
                <View key={'row'+i*3} style={{width: '98.5%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                    <View>
                    <Image source={ImageArray[activity[0]]}/>
                    <View style={{width: '100%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                        <View style={{alignItems:'center'}}>
                        <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exall0.png")}/>
                        <Text style={{position:'absolute',textAlign:'center',marginTop:30,fontSize:25,fontWeight:'bold'}}>{actNameAll[activity[0]]}</Text>
                        
                        <TouchableOpacity style={{position:"absolute",marginTop:100,alignItems:'center'}} onPress={() => {
                         scoreCtx.setGame(1, 38, 1);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={{position:'absolute',textAlign:'center',marginTop:5,fontSize:25,fontWeight:'bold'}}>{exerciseText1}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:110,left:290}}onPress={() => {}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/heart1.png")}/>
                        </TouchableOpacity>
                    </View>
                    </View>
                    </View>
                </View>
            )
            }
            else if(array.length==2)
            {
                var exerciseText1 = text1a;
                var exerciseText2 = text1a;
                if(newTypeArray[i][0]==0)
                {
                    exerciseText1 = text1a;
                }
                else if(newTypeArray[i][0]==1)
                {
                    exerciseText1 = text1b;
                }
                else if(newTypeArray[i][0]==2)
                {
                    exerciseText1 = text1c;
                }
                if(newTypeArray[i][1]==0)
                {
                    exerciseText1 = text1a;
                }
                else if(newTypeArray[i][1]==1)
                {
                    exerciseText2 = text1b;
                }
                else if(newTypeArray[i][1]==2)
                {
                    exerciseText2= text1c;
                }
                FavArray.push( 
                <View key={'row'+i*3} style={{width: '98.5%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                    <View>
                    <Image source={ImageArray[activity[0]]}/>
                    <View style={{width: '100%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                        <View style={{alignItems:'center'}}>
                        <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exall0.png")}/>
                        <Text style={{position:'absolute',textAlign:'center',marginTop:30,fontSize:25,fontWeight:'bold'}}>{actNameAll[activity[0]]}</Text>
                        
                        <TouchableOpacity style={{position:"absolute",marginTop:100,alignItems:'center'}} onPress={() => {
                         scoreCtx.setGame(1, 38, 1);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={{position:'absolute',textAlign:'center',marginTop:5,fontSize:25,fontWeight:'bold'}}>{exerciseText1}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:110,left:290}}onPress={() => {}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/heart1.png")}/>
                        </TouchableOpacity>
                    </View>
                    </View>
                    </View>

                    <View>
                    <Image source={ImageArray[activity[1]]}/>
                    <View style={{width: '100%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                        <View style={{alignItems:'center'}}>
                        <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exall0.png")}/>
                        <Text style={{position:'absolute',textAlign:'center',marginTop:30,fontSize:25,fontWeight:'bold'}}>{actNameAll[activity[1]]}</Text>
                        
                        <TouchableOpacity style={{position:"absolute",marginTop:100,alignItems:'center'}} onPress={() => {
                         scoreCtx.setGame(1, 38, 1);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={{position:'absolute',textAlign:'center',marginTop:5,fontSize:25,fontWeight:'bold'}}>{exerciseText2}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:110,left:290}}onPress={() => {}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/heart1.png")}/>
                        </TouchableOpacity>
                    </View>
                    </View>
                    </View>
                </View>
                )
            }
            else{
                var exerciseText1 = text1a;
                var exerciseText2 = text1a;
                var exerciseText3 = text1a;
                if(newTypeArray[i][0]==0)
                {
                    exerciseText1 = text1a;
                }
                else if(newTypeArray[i][0]==1)
                {
                    exerciseText1 = text1b;
                }
                else if(newTypeArray[i][0]==2)
                {
                    exerciseText1 = text1c;
                }
                if(newTypeArray[i][1]==0)
                {
                    exerciseText1 = text1a;
                }
                else if(newTypeArray[i][1]==1)
                {
                    exerciseText2 = text1b;
                }
                else if(newTypeArray[i][1]==2)
                {
                    exerciseText2= text1c;
                }
                if(newTypeArray[i][2]==0)
                {
                    exerciseText3 = text1a;
                }
                else if(newTypeArray[i][2]==1)
                {
                    exerciseText3 = text1b;
                }
                else if(newTypeArray[i][2]==2)
                {
                    exerciseText3= text1c;
                }
                FavArray.push(
                <View key={'row'+i*3} style={{width: '98.5%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                    <View>
                    <Image source={ImageArray[activity[0]]}/>
                    <View style={{width: '100%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                        <View style={{alignItems:'center'}}>
                        <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exall0.png")}/>
                        <Text style={{position:'absolute',textAlign:'center',marginTop:30,fontSize:25,fontWeight:'bold'}}>{actNameAll[activity[0]]}</Text>
                        
                        <TouchableOpacity style={{position:"absolute",marginTop:100,alignItems:'center'}} onPress={() => {
                         scoreCtx.setGame(1, 38, 1);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={{position:'absolute',textAlign:'center',marginTop:5,fontSize:25,fontWeight:'bold'}}>{exerciseText1}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:110,left:290}}onPress={() => {}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/heart1.png")}/>
                        </TouchableOpacity>
                    </View>
                    </View>
                    </View>
                    
                    <View>
                    <Image source={ImageArray[activity[1]]}/>
                    <View style={{width: '100%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                        <View style={{alignItems:'center'}}>
                        <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exall0.png")}/>
                        <Text style={{position:'absolute',textAlign:'center',marginTop:30,fontSize:25,fontWeight:'bold'}}>{actNameAll[activity[1]]}</Text>
                        
                        <TouchableOpacity style={{position:"absolute",marginTop:100,alignItems:'center'}} onPress={() => {
                         scoreCtx.setGame(1, 38, 1);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={{position:'absolute',textAlign:'center',marginTop:5,fontSize:25,fontWeight:'bold'}}>{exerciseText2}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:110,left:290}}onPress={() => {}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/heart1.png")}/>
                        </TouchableOpacity>
                    </View>
                    </View>
                    </View>

                    <View>
                    <Image source={ImageArray[activity[2]]}/>
                    <View style={{width: '100%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                        <View style={{alignItems:'center'}}>
                        <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exall0.png")}/>
                        <Text style={{position:'absolute',textAlign:'center',marginTop:30,fontSize:25,fontWeight:'bold'}}>{actNameAll[activity[2]]}</Text>
                        
                        <TouchableOpacity style={{position:"absolute",marginTop:100,alignItems:'center'}} onPress={() => {
                         scoreCtx.setGame(1, 38, 1);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={{position:'absolute',textAlign:'center',marginTop:5,fontSize:25,fontWeight:'bold'}}>{exerciseText3}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:110,left:290}}onPress={() => {}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/heart1.png")}/>
                        </TouchableOpacity>
                    </View>
                    </View>
                    </View>

                </View>)
        }}
        );
        return(       
            
            <ScrollView contentContainerStyle={{flexGrow:1,height:scrollHeight,width:scrollWidth,alignItems:'center'}}>
                <View style={{flexDirection: 'column', position: 'absolute', justifyContent: 'center', marginTop: 10, width: 1112, flex:1}}>
                    {FavArray}
                    
                    <View style={{flex:1,alignItems:'center'}}>
                        <TouchableOpacity onPress={removeFavourite}>
                            <Image style={{marginTop:50}} source={require("../../new_assets/1_Landing_page/2_Tab_bar/delbutton.png")}></Image>
                        </TouchableOpacity>
                    </View>        
                </View>
            </ScrollView>    
            
        )
    }

    const ActivityListAll= () =>{
        
        const actNameAll = ["頸部 - 向左及向右側","頸部 - 前屈後仰","頸部 - 旋轉動作",
        "手臂 - 屈曲動作","手腕 - 向上及向下屈曲","前臂 - 向上及向下動作","前臂 - 反手動作","手部 - 手掌握拳","手部 - 拍手",
        "肩膊 - 向上拉至盡","肩膊 - 握毛巾向上推","肩膊 - 向後伸展","肩膊 - 打橫舉至盡","肩膊 - 手臂向內移動","肩膊 - 手臂向外移動","肩膊 - 抹窗動作","肩膊 - 伸展動作","肩膊 - 向橫打開","肩膊 - 舉重動作","肩膊 - 畫圈動作",
        "腰背 - 伸展運動","腰背 - 轉動運動","全身 - 企坐動作"];
        const ImageArray = [act1Image,act2Image,act3Image,act4Image,act5Image,act6Image,act7Image,act8Image,act9Image,act10Image,act11Image,act12Image,act13Image,act14Image,act15Image,act16Image,act17Image,act18Image,act19Image,act20Image,act21Image,act22Image,act23Image];
        var text1a = "幅度練習";
        var text1b = "力量練習";
        var text1c = "速度練習";
        const AllActivityArray =[];
        const newActName = groupBy(actNameAll,3);
        console.log(newActName);

        var scrollHeight = 550*newActName.length;
        var scrollWidth = screenWidth;

        newActName.forEach((activity,i)=>
        {
            var array =[];
            array = activity;
            if(array.length==1){
                var exerciseText1 = text1a;
                var exerciseText2 = text1b;
                var exerciseText3 = text1c;
                var currentID = i*3;
                AllActivityArray.push( 
                <View key={'row'+currentID} style={{width: '98.5%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                    <View>
                    <Image source={ImageArray[currentID]}/>
                    <View style={{width: '100%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                        <View style={{alignItems:'center'}}>
                        <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exall0.png")}/>
                        <Text style={{position:'absolute',textAlign:'center',marginTop:30,fontSize:25,fontWeight:'bold'}}>{actNameAll[currentID]}</Text>
                        
                        <TouchableOpacity style={{position:"absolute",marginTop:100,alignItems:'center'}} onPress={() => {
                         scoreCtx.setGame(1, 38, 1);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={styles.textStyle}>{exerciseText1}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:110,left:290}}onPress={() => {setFavourite(currentID,0)}}>
                        {checkFav(currentID,0)?<Image1/>:<Image0/>}
                        </TouchableOpacity>

                        <TouchableOpacity style={{position:"absolute",marginTop:170,alignItems:'center'}}onPress={() => {
                         scoreCtx.setGame(1, 38, 2);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={styles.textStyle}>{exerciseText2}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:180,left:290}}onPress={() => {setFavourite(currentID,1)}}>
                            {checkFav(currentID,1)?<Image1/>:<Image0/>}
                            </TouchableOpacity>

                        <TouchableOpacity style={{position:"absolute",marginTop:240,alignItems:'center'}}onPress={() => {
                         scoreCtx.setGame(1, 38, 3);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={styles.textStyle}>{exerciseText3}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:250,left:290}}onPress={() => {setFavourite(currentID,2)}}>
                        {checkFav(currentID,2)?<Image1/>:<Image0/>}
                        </TouchableOpacity>
                    </View>
                    </View>
                    </View>
                </View>
            )
            }
            else if(array.length==2)
            {
                var exerciseText1 = text1a;
                var exerciseText2 = text1b;
                var exerciseText3 = text1c;
                var currentID = i*3;
                AllActivityArray.push( 
                <View key={'row'+currentID} style={{width: '98.5%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                    <View>
                    <Image source={ImageArray[currentID]}/>
                    <View style={{width: '100%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                        <View style={{alignItems:'center'}}>
                        <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exall0.png")}/>
                        <Text style={{position:'absolute',textAlign:'center',marginTop:30,fontSize:25,fontWeight:'bold'}}>{actNameAll[currentID]}</Text>
                        
                        <TouchableOpacity style={{position:"absolute",marginTop:100,alignItems:'center'}} onPress={() => {
                         scoreCtx.setGame(1, 38, 1);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={styles.textStyle}>{exerciseText1}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:110,left:290}}onPress={() => {setFavourite(currentID,0)}}>
                        {checkFav(currentID,0)?<Image1/>:<Image0/>}
                        </TouchableOpacity>

                        <TouchableOpacity style={{position:"absolute",marginTop:170,alignItems:'center'}}onPress={() => {
                         scoreCtx.setGame(1, 38, 2);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={styles.textStyle}>{exerciseText2}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:180,left:290}}onPress={() => {setFavourite(currentID,1)}}>
                        {checkFav(currentID,1)?<Image1/>:<Image0/>}
                        </TouchableOpacity>

                        <TouchableOpacity style={{position:"absolute",marginTop:240,alignItems:'center'}}onPress={() => {
                         scoreCtx.setGame(1, 38, 3);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={styles.textStyle}>{exerciseText3}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:250,left:290}}onPress={() => {setFavourite(currentID,2)}}>
                        {checkFav(currentID,2)?<Image1/>:<Image0/>}
                        </TouchableOpacity>
                    </View>
                    </View>
                    </View>

                    <View>
                    <Image source={ImageArray[currentID+1]}/>
                    <View style={{width: '100%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                        <View style={{alignItems:'center'}}>
                        <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exall0.png")}/>
                        <Text style={{position:'absolute',textAlign:'center',marginTop:30,fontSize:25,fontWeight:'bold'}}>{actNameAll[currentID+1]}</Text>
                        
                        <TouchableOpacity style={{position:"absolute",marginTop:100,alignItems:'center'}} onPress={() => {
                         scoreCtx.setGame(1, 38, 1);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={styles.textStyle}>{exerciseText1}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:110,left:290}}onPress={() => {setFavourite(currentID+1,0)}}>
                            {checkFav(currentID+1,0)?<Image1/>:<Image0/>}
                        </TouchableOpacity>

                        <TouchableOpacity style={{position:"absolute",marginTop:170,alignItems:'center'}}onPress={() => {
                         scoreCtx.setGame(1, 38, 2);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={styles.textStyle}>{exerciseText2}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:180,left:290}}onPress={() => {setFavourite(currentID+1,1)}}>
                        {checkFav(currentID+1,1)?<Image1/>:<Image0/>}
                        </TouchableOpacity>

                        <TouchableOpacity style={{position:"absolute",marginTop:240,alignItems:'center'}}onPress={() => {
                         scoreCtx.setGame(1, 38, 3);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={styles.textStyle}>{exerciseText3}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:250,left:290}}onPress={() => {setFavourite(currentID+1,2)}}>
                        {checkFav(currentID+1,2)?<Image1/>:<Image0/>}
                        </TouchableOpacity>
                    </View>
                    </View>
                    </View>
                </View>
                )
            }
            else{
                var exerciseText1 = text1a;
                var exerciseText2 = text1b;
                var exerciseText3 = text1c;
                currentID = i*3;
                AllActivityArray.push(
                <View key={'row'+currentID} style={{width: '98.5%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                    <View>
                    <Image source={ImageArray[currentID]}/>
                    <View style={{width: '100%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                        <View style={{alignItems:'center'}}>
                        <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exall0.png")}/>
                        <Text style={{position:'absolute',textAlign:'center',marginTop:30,fontSize:25,fontWeight:'bold'}}>{actNameAll[currentID]}</Text>
                        
                        <TouchableOpacity style={{position:"absolute",marginTop:100,alignItems:'center'}} onPress={() => {
                         scoreCtx.setGame(1, 38, 1);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={styles.textStyle}>{exerciseText1}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:110,left:290}}onPress={() => {setFavourite(currentID,0)}}>
                        {checkFav(currentID,0)?<Image1/>:<Image0/>}
                        </TouchableOpacity>

                        <TouchableOpacity style={{position:"absolute",marginTop:170,alignItems:'center'}}onPress={() => {
                         scoreCtx.setGame(1, 38, 2);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={styles.textStyle}>{exerciseText2}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:180,left:290}}onPress={() => {setFavourite(currentID,1)}}>
                        {checkFav(currentID,1)?<Image1/>:<Image0/>}
                        </TouchableOpacity>

                        <TouchableOpacity style={{position:"absolute",marginTop:240,alignItems:'center'}}onPress={() => {
                         scoreCtx.setGame(1, 38, 3);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={styles.textStyle}>{exerciseText3}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:250,left:290}}onPress={() => {setFavourite(currentID,2)}}>
                        {checkFav(currentID,2)?<Image1/>:<Image0/>}
                        </TouchableOpacity>
                    </View>
                    </View>
                    </View>
                    
                    <View>
                    <Image source={ImageArray[currentID+1]}/>
                    <View style={{width: '100%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                        <View style={{alignItems:'center'}}>
                        <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exall0.png")}/>
                        <Text style={{position:'absolute',textAlign:'center',marginTop:30,fontSize:25,fontWeight:'bold'}}>{actNameAll[currentID+1]}</Text>
                        
                        <TouchableOpacity style={{position:"absolute",marginTop:100,alignItems:'center'}} onPress={() => {
                         scoreCtx.setGame(1, 38, 1);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={styles.textStyle}>{exerciseText1}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:110,left:290}}onPress={() => {setFavourite(currentID+1,0)}}>
                        {checkFav(currentID+1,0)?<Image1/>:<Image0/>}
                        </TouchableOpacity>

                        <TouchableOpacity style={{position:"absolute",marginTop:170,alignItems:'center'}}onPress={() => {
                         scoreCtx.setGame(1, 38, 2);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={styles.textStyle}>{exerciseText2}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:180,left:290}}onPress={() => {setFavourite(currentID+1,1)}}>
                        {checkFav(currentID+1,1)?<Image1/>:<Image0/>}
                        </TouchableOpacity>

                        <TouchableOpacity style={{position:"absolute",marginTop:240,alignItems:'center'}}onPress={() => {
                         scoreCtx.setGame(1, 38, 3);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={styles.textStyle}>{exerciseText3}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:250,left:290}}onPress={() => {setFavourite(currentID+1,2)}}>
                        {checkFav(currentID+1,2)?<Image1/>:<Image0/>}
                        </TouchableOpacity>
                    </View>
                    </View>
                    </View>

                    <View>
                    <Image source={ImageArray[currentID+2]}/>
                    <View style={{width: '100%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                        <View style={{alignItems:'center'}}>
                        <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exall0.png")}/>
                        <Text style={{position:'absolute',textAlign:'center',marginTop:30,fontSize:25,fontWeight:'bold'}}>{actNameAll[currentID+2]}</Text>
                        
                        <TouchableOpacity style={{position:"absolute",marginTop:100,alignItems:'center'}} onPress={() => {
                         scoreCtx.setGame(1, 38, 1);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={styles.textStyle}>{exerciseText1}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:110,left:290}}onPress={() => {setFavourite(currentID+2,0)}}>
                        {checkFav(currentID+2,0)?<Image1/>:<Image0/>}
                        </TouchableOpacity>

                        <TouchableOpacity style={{position:"absolute",marginTop:170,alignItems:'center'}}onPress={() => {
                         scoreCtx.setGame(1, 38, 2);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={styles.textStyle}>{exerciseText2}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:180,left:290}}onPress={() => {setFavourite(currentID+2,1)}}>
                        {checkFav(currentID+2,1)?<Image1/>:<Image0/>}
                        </TouchableOpacity>

                        <TouchableOpacity style={{position:"absolute",marginTop:240,alignItems:'center'}}onPress={() => {
                         scoreCtx.setGame(1, 38, 3);scoreCtx.setScreen(5);}}>
                            <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/exheart0.png")}/>
                            <Text style={styles.textStyle}>{exerciseText3}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{position:"absolute",marginTop:250,left:290}}onPress={() => {setFavourite(currentID+2,2)}}>
                        {checkFav(currentID+2,2)?<Image1/>:<Image0/>}
                        </TouchableOpacity>
                    </View>
                    </View>
                    </View>

                </View>)
        }}
        );
        return(       
            
            <ScrollView contentContainerStyle={{flexGrow:1,height:scrollHeight,width:scrollWidth,alignItems:'center'}}>
                <View style={{flexDirection: 'column', position: 'absolute', justifyContent: 'center', marginTop: 10, width: 1112, flex:1}}>
                    {AllActivityArray}
                </View>
            </ScrollView>    
            
        )
    }

    const ActivityListToday= () =>{
        var text1a = "強化肌肉練習";
        var text1b = " 個練習";
        var text2a = "上半身練習";
        var text2b = " 個練習";
        var text3a = "下半身練習";
        var text3b = " 個練習";
        var randomNumber1 = Math.floor(Math.random()*10+1);
        var randomNumber2 = Math.floor(Math.random()*10+1);
        var randomNumber3 = Math.floor(Math.random()*10+1);
        text1b = randomNumber1+text1b;
        text2b = randomNumber2+text2b;
        text3b = randomNumber3+text3b;
    return(
    <ScrollView contentContainerStyle={{flexGrow:1,height:1000,width:screenWidth,alignItems:'center'}}>
                    <View style={{flexDirection: 'column', position: 'absolute', justifyContent: 'center', marginTop: 10, width: 1112, flex:1}}>
                        <View style={{width: '98.5%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                            {/* <TouchableOpacity> */}
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex1.png")}/>
                            {/* </TouchableOpacity> */}
                            {/* <TouchableOpacity> */}
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex2.png")}/>
                            {/* </TouchableOpacity> */}
                            {/* <TouchableOpacity> */}
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex3.png")}/>
                            {/* </TouchableOpacity> */}
                        </View>

                        <View style={{width: '98.5%', flexDirection: 'row', alignSelf: 'center', flex:1}}>
                                <TouchableOpacity style={{alignItems:'center'}}>
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex0.png")}/>
                                <Text style={{position:'absolute',textAlign:'center',marginTop:30,fontSize:30,fontWeight:'bold'}}>{text1a}</Text>
                                <Text style={{position:'absolute',textAlign:'center',marginTop:80,fontSize:24,fontWeight:'bold',color:'#0aaaff'}}>{text1b}</Text>
                                </TouchableOpacity>
                            <TouchableOpacity style={{alignItems:'center'}}>
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex0.png")}/>
                                <Text style={{position:'absolute',textAlign:'center',marginTop:30,fontSize:30,fontWeight:'bold'}}>{text2a}</Text>
                                <Text style={{position:'absolute',textAlign:'center',marginTop:80,fontSize:24,fontWeight:'bold',color:'#0aaaff'}}>{text2b}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{alignItems:'center'}}>
                                <Image source={require("../../new_assets/1_Landing_page/2_Tab_bar/ex0.png")}/>
                                <Text style={{position:'absolute',textAlign:'center',marginTop:30,fontSize:30,fontWeight:'bold'}}>{text3a}</Text>
                                <Text style={{position:'absolute',textAlign:'center',marginTop:80,fontSize:24,fontWeight:'bold',color:'#0aaaff'}}>{text3b}</Text>
                            </TouchableOpacity>
                        </View>
                     </View>
                </ScrollView>
    )
    }

    return (
        <View style={styles.container}>
            <View>
                <Image source={
                    require("../../new_assets/1_Landing_page/1_Navigation_bar/topbar1text.png")
                }
                style={{width: screenWidth}}
                />
                <View style={styles.tabBarText}>
                    {/*最左邊*/}
                    <View style={styles.home}>
                        <HomeIcon size={50} color='white'/>
                        <Text style={{color: 'white', fontSize: 32, alignSelf: 'center', paddingLeft: 10}}>主頁</Text>
                    </View>
                    {/*中間*/}
                    <View style={{flexDirection: 'row',width:screenWidth-100}}>
                        <TouchableOpacity onPress={onStartButtonPressed} style={{flex:1}}>
                            <Image style={{justifyContent: 'center', marginBottom: 0}} source={require("../../new_assets/1_Landing_page/1_Navigation_bar/btnhome.png")}/>
                        </TouchableOpacity>
                        <Text style={{flex:1,color: 'white', fontSize: 32, alignSelf: 'center', paddingHorizontal: 15}}></Text>
                        <Image style={{flex:1}} resizeMode='contain' source={require("../../new_assets/1_Landing_page/1_Navigation_bar/btnsetting.png")}/>
                    </View>
                    {/*最右邊*/}
                    <View style={{alignItems:'flex-end'}}>
                    <Text onPress={onStartButtonPressed} style={{color: 'white',fontSize: 20, flex: 1, textAlign: 'center'}}>登出</Text>
                    </View>
                </View>
            </View>

            <View style={{flex:2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', transform: [{scale: 0.9}]}}>
                {/* Top bar */}
                <View style={{flexDirection: 'row', width: 1114}}>
                    <TouchableOpacity onPress={btnclick0}>
                        <Image source={imglink1}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={btnclick1}>
                        <Image source={imglink2}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={btnclick2}>
                        <Image source={imglink3}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={btnclick3}>
                        <Image source={imglink4}/>
                    </TouchableOpacity>
                </View>

                {/* Body */}
                <ChoosenActivityView />
            </View>
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
        backgroundColor: "#f1f2f0",
        alignItems: 'center',
        width: screenWidth
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
    ui: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    home: {
        flexDirection: 'row',
        paddingLeft: 30,
        flex: 1,
    },
    bodyPart: {
        backgroundColor: 'darkorange',
        flex: 1,
        marginLeft: 1,
        alignContent: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth: 1,
    },
    touchopacityStyle:{
        position:"absolute",
        marginTop:100,
        alignItems:'center'
    },
    textStyle:{
        position:'absolute',
        textAlign:'center',
        marginTop:5,
        fontSize:25,
        fontWeight:'bold'
    },

});

export default HomeScreen;