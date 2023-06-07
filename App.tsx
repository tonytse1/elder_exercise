import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
} from 'react-native';
import 'localstorage-polyfill';

import AppNavigator from './navigation/AppNavigator';

import ScoreContextProvider from './store/score-context';
import LoginScreen from './screens/login/LoginScreen';
import AuthScreen from './screens/login/AuthScreen';
import HomeScreen from './screens/main/HomeScreen';
import { Log } from '@tensorflow/tfjs';
import PoseDetectScreen from './screens/main/PoseDetectScreen';
import Bubbles from './components/svg/Bubbles';
import SoundEffect from './screens/SoundEffect';
import CalibrationScreen from './screens/main/CalibrationScreen';
import TutorialScreen from './screens/main/TutorialScreen';
import EndExercise from './screens/main/EndExerciseScreen';

export default function App() {

  return (
      <ScoreContextProvider>
            <AppNavigator/>
          <StatusBar style="auto" />
      </ScoreContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
