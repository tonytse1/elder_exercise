import React, {useState, useEffect} from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const App = () => {
  const [soundEffect, setSoundEffect] = useState(null);
  const [playSound, setPlaySound] = useState(false);
  const [times, setTimes] = useState(0)

  useEffect(() => {
    loadSoundEffect();
    setTimes(times+1)
  }, [playSound]);

  const loadSoundEffect = async () => {
    const soundEffectObject = new Audio.Sound();
    try {
      await soundEffectObject.loadAsync(require('/Users/jimmy/Desktop/Intern Work/MobilePoseDetection-main 2/new_assets/scored_sound.mp3'));
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        playThroughEarpieceAndroid: false,
      });

      setSoundEffect(soundEffectObject);
    } catch (error) {
      console.log('Failed to load the sound effect', error);
    }
  };

  const playScoredSound = async () => {
    if (soundEffect !== null && soundEffect !== undefined) {
      try {
        setPlaySound(!playSound)
        await soundEffect.playAsync();
        console.log("sound played "+times+" times")
      } catch (error) {
        console.log('Failed to play the sound effect', error);
      }
    } else {
      console.log("Sound Effect null")
    }
  };
  

  return (
    <View style={styles.container}>
      <Button title="Press me" onPress={playScoredSound} />
    </View>
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


export default App;