import React, { useState, useEffect, useRef, useContext, useMemo, useCallback } from 'react';
import {
    Alert,
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    Modal,
} from 'react-native';

import * as Linking from 'expo-linking';


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

// Screens
import HomeScreen from '../../screens/main/HomeScreen';
import { acc } from 'react-native-reanimated';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const LoginScreen: React.FC = () => {
    const scoreCtx = useContext(ScoreContext);

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordVaild, setPasswordVaild] = React.useState(false);

    const bgimage = require("../../new_assets/LR-Login1.png");
    const loginbtn = require("../../new_assets/Login/loginbtn.png");
    const visitorlogin = require("../../new_assets/Login/visitorlogin.png");
    const forgotpw = require("../../new_assets/Login/forgotpw.png");
    const createac = require("../../new_assets/Login/createac.png");
    const pwimage = require("../../new_assets/Login/pw.png");
    const accimage = require("../../new_assets/Login/acc.png");

    const loginpopup = require("../../new_assets/loginpopup.png");
    const logindismiss = require("../../new_assets/logindismiss.png");

    const [ModalVisible, setModalVisible] = useState(false);

    var appToken = "0";
    const domainURL = 'https://elchk.uat.talkbox.net/';

    const [favArray, setfavArray] = useState([[0,0,0],[0,0,0],[0,0,0]]);

    useEffect(()=>{
        scoreCtx.setGame(0, 0, 0)
    }, [])

    // useEffect(()=>{
    //   console.log(username)
    // }, [username])

    const checkuser = () =>
    {
        console.log(username);
        if(username=="test")
        {
            Alert.alert('Error','Username not match',[
                {
                    text:'Cancel',
                    onPress: () => console.log("cancel"), 
                    style:'cancel',
                }
            ]);
        }
        else{
            scoreCtx.setGame(1, 38, 1);scoreCtx.setScreen(5);
        }
    }

    const onStartButtonPressed = () => {
        try {
            scoreCtx.setScreen(1);
        } catch (error) {
            console.log("HomeScreen.tsx: Error discovered: "+error)
        }
    };

    const gotoSMS = () =>{
        // loginAcc("art001u001","art001u001");
        // console.log(username,password);
        loginAcc(username,password);
        scoreCtx.setScreen(2);
    }

    const showCreatePopup = () =>{

    }

    const updateArray = (index) =>{
        var arraytemp = favArray;
        var numberUpdate = 0;
        numberUpdate = arraytemp[index][1];
        if(numberUpdate==0)
        {
            arraytemp[index][1] = 1;
        }
        else{
            arraytemp[index][1] = 0;
        }
        setfavArray(arraytemp);
    }

    const getToken = () =>
    {
        return fetch('https://elcssar-dev.vpl.ai/api/v1/elcss-app/token?deviceId=testdevice',{
            method: 'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
                'app-key': 'kMjXsKsfTKe8rC4BR42a51ilWe0BUDdr',
            },
            body: JSON.stringify({
            })
        })
        .then(response => response.json())
        .then(json =>{
            console.log("token received:",json);
            appToken = json.token;
            updateVideo();
            return json.token;
        })
        .catch(error =>{
            console.error(error);
        });
    };

    const loginAcc = (loginName,loginPW) =>
    {
        return fetch(domainURL+'api/elderly/login',{
            method: 'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json; charset=utf-8',
                'app-key': 'hY3#nDl5g2HD22Uhdwegu76Hal4n',
            },
            body: JSON.stringify({
                'platform':'ios',
                'udId':'test',
                'lang':'en',
                'version':'1.1',
                '2fa':{"type":"sms","otp":"string"},
                'credential':{"username":loginName,"password":loginPW}
            })
        })
        .then(response => response.json())
        .then(json =>{
            console.log("login token received:",json);
            appToken = json.token;
            return json.token;
        })
        .catch(error =>{
            console.error(error);
        });
    }

    const getVideo = () =>
    {
        return fetch('https://elcssar-dev.vpl.ai/api/v1/elcss-app/videos',{
            method: 'GET',
            headers:{
                Accept: 'application/json',
                'api-key': appToken,
            },
        })
        .then(response => response.json())
        .then(json =>{
            console.log("video:",json);
            return json;
        })
        .catch(error =>{
            console.error(error);
        });
    }

    const updateVideo = () =>
    {
        return fetch('https://elcssar-dev.vpl.ai/api/v1/elcss-app/members/profile',{
            method: 'PUT',
            headers:{
                Accept: 'application/json',
                'api-key': appToken,
                "Content-Type":'application/json'
            },
            body:JSON.stringify({
                "lrUserId": "70459021-6187-4489-a570-8e3f071e33b0",
                "nameChi": "Hello World",
                "nameEng": "Hello World",
                "gender": null,
                "email": null
            })
        })
        .then(response => response.json())
        .then(json =>{console.log('responded',json)
        return json;
        })
    }

    function gotoDeeplink()
    {
        Linking.openURL("https://www.youtube.com/watch?v=8CE4ijWlQ18");//("https://www.google.com.hk");
        setModalVisible(false);
    }

    function gotoDeeplinkPW()
    {
        Linking.openURL("https://www.youtube.com/watch?v=8CE4ijWlQ18");
    }



    return (
        <View style={styles.app}>
          <ImageBackground source={bgimage} resizeMode='cover' style={styles.image}>
            <View style={styles.tabBarText1}>
              <View style={{flex:1}}>
              </View>

              <View style={{flex:1,justifyContent:'space-between'}}>
              <Text style={{textAlign:'center',height:100}}></Text>
              <Image source={accimage}></Image>
              <TextInput
                        style={styles.loginInfoInput}
                        onChangeText={text => setUsername(text)}
                        value={username}
                    />
              <Text style={{textAlign:'center',height:20}}></Text>
              <View style={{flexDirection:'row'}}>
              <Image source={pwimage}></Image>
              <Text style={{textAlign:'center',width:140}}></Text>
              <TouchableOpacity onPress={()=>gotoDeeplinkPW()}><Image source={forgotpw}></Image></TouchableOpacity>
              </View>
              <TextInput
                 style={styles.loginInfoInput}
                 secureTextEntry={true}
                 onChangeText={text => setPassword(text)}
                  value={password}
              />
              <Text style={{textAlign:'center',height:30}}></Text>

              <TouchableOpacity onPress={()=>gotoSMS()}><Image source={loginbtn} resizeMode='contain' style={{width:400}}></Image></TouchableOpacity>
              <Text style={{textAlign:'center',height:40}}></Text>
              <Text style={{textAlign:'center',height:40,fontSize:28,width:400}}>沒有帳戶？</Text>

              <View style={{flex:1,width:400, flexDirection:'row'}}>
              <TouchableOpacity  style={{transform:[{scale:0.7}],flex:1}} onPress={()=>setModalVisible(true)}><Image resizeMode='contain' source={createac}></Image></TouchableOpacity>
              <TouchableOpacity  style={{transform:[{scale:0.7}],flex:1}} onPress={onStartButtonPressed}><Image resizeMode='contain' source={visitorlogin}></Image></TouchableOpacity>
              </View>
              </View>
            </View>
          </ImageBackground>

          <Modal animationType='fade' transparent={true} visible={ModalVisible} onRequestClose={()=>{setModalVisible(!ModalVisible)}}>
            <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:0,backgroundColor:'rgba(0,0,0,0.8)'}}>
                <ImageBackground source={loginpopup} resizeMode='contain' style={styles.image} blurRadius={0}>
                    <View style={{height:480}}></View>
                    <TouchableOpacity style={{position:'absolute',right:20,top:170}} onPress={()=>setModalVisible(false)}>
                        <Text style={{fontWeight:'bold',fontSize:30}}>X</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{transform:[{scale:0.8}]}} onPress={()=>gotoDeeplink()}>
                        <Image resizeMode='contain' source={logindismiss}></Image>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
          </Modal>
        </View>
      )

    return (

        // <View style={styles.container}>
        <View style={{flex:1}}>
            <ImageBackground source={bgimage} resizeMode='cover' style={styles.image}>
            {/* <View style={{width:200,height:200,flex:1,borderWidth:10,borderColor:'red'}}>
            <View style={{flex:2,borderWidth:10,borderColor:'green'}}>
            <View style={{width:100,flex:3,borderWidth:10,borderColor:'blue'}}>
            </View>
            <View style={{width:100,flex:3,borderWidth:10,borderColor:'cyan'}}>
            </View>
            </View>
            <View style={{flex:1,borderWidth:10,borderColor:'orange'}}>
            </View>
            </View> */}
             <View style={{width: screenWidth,flex:2}}>
                {/* <Image source={
                    require("../../new_assets/2_Exercise_page/Version1/Top_bar_1x.png")
                }
                style={{width: '100%'}}
                /> */}
                <View style={styles.tabBarText}>
                    {/*最左邊*/}
                    <Text style={{color: 'white', fontSize: 0, flex: 1, textAlign: 'center'}}></Text>
                    {/*中間*/}
                    <Text style={{color: 'white', fontSize: 32, flex: 1, textAlign: 'center'}}>LR帳戶登入</Text>
                    {/*最右邊*/}
                    <Text onPress={() => {}} style={{color: 'white',fontSize: 20, flex: 1, textAlign: 'center'}}>建立帳戶</Text>
                </View>
            </View>
            <View style={styles.newlogin}>
                <TouchableOpacity onPress={onStartButtonPressed} style={{backgroundColor: '#1c9256', width:'80%', height: '10%', justifyContent: 'center', borderRadius: 20, borderWidth: 1}}>
                    <Text style={{color:'white', fontSize: 24, textAlign: 'center'}}>以訪客身分使用</Text>
                </TouchableOpacity>
                <View style={{width: '80%', alignContent: 'space-around', paddingVertical: 10,}}>
                    <Text style={styles.loginInfo}>帳戶名稱：</Text>
                    <TextInput
                        style={styles.loginInfoInput}
                        onChangeText={text => setUsername(text)}
                        value={username}
                    />
                    <Text style={styles.loginInfo}>密碼：</Text>
                    <TextInput
                        style={styles.loginInfoInput}
                        onChangeText={text => setPassword(text)}
                        value={password}
                    />
                    <View style={{flexDirection: 'row'}}>
                        {passwordVaild ? <Text style={{color: 'red', fontSize: 28, fontWeight: 'bold'}}>帳戶名稱/密碼錯誤</Text> : <Text style={{flex:1}}></Text>}
                        <Text onPress={() => {scoreCtx.setScreen(2)}} style={{fontSize: 26, color: 'green', textAlign:'right', flex:1, paddingBottom: 10}}>忘記密碼</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => {
                    // setPasswordVaild(!passwordVaild);
                    checkuser();}} style={{backgroundColor: '#1c9256', width:'80%', height: '10%', justifyContent: 'center', borderRadius: 20, borderWidth: 1}}>
                    <Text style={{color:'white', fontSize: 24, textAlign: 'center'}}>登入</Text>
                </TouchableOpacity>
            </View>
            <Text style={{position: 'absolute', fontWeight: 'bold', color: 'white', width: screenWidth, textAlign: 'center'}}>Version: 2023040302</Text>
            </ImageBackground>
        </View>
        
    );
}

const styles = StyleSheet.create({
    image:{
        flex:1,
        // justifyContent:'center'
    },
    container: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        flex:1,
        backgroundColor: "#fff8dc",
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
    tabBarText1: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'space-between',
    },
    newlogin:{
        flex:6,
        justifyContent: 'flex-end',
        width:'50%',
        alignItems: 'flex-end',
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
    loginInfoInput: {
        height: 60, 
        textAlign: 'center',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: 'white',
        width: 400,
        fontSize:24,
    },

    app: {
        flex:11, // the number of columns you want to devide the screen into
        marginHorizontal: "auto",
        width: screenWidth,
        backgroundColor: ""
      },

});

export default LoginScreen;