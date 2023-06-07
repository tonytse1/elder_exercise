import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Audio, Video as OriginalVideo, ResizeMode } from 'expo-av';

export function TutorialVideo(replay){
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const url = require('../../new_assets/demo.mp4');

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const triggerAudio = async (ref) => {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    ref.current.playAsync();
  };

  const handleReplay = async () => {
    if (videoRef.current) {
      console.log("Video is Playing")
      await videoRef.current.replayAsync();
    }
  };

  useEffect(() => {
    triggerAudio(videoRef);
  }, [videoRef, status]);

  useEffect(()=>{
    handleReplay()
  },[replay])
  
  const handlePlaybackStatusUpdate = playbackStatus => {
    if (playbackStatus.didJustFinish) {
      console.log('Video finished playing!');
    }
  };


  return (
    <View style={styles.videoContainer}>
        <OriginalVideo ref={videoRef} source={url} // Replace with your video file path
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        style={styles.video}
        volume={3.0}
        resizeMode={ResizeMode.CONTAIN}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    
  },
  video: {
    width: '100%',
    height: '100%',
    borderWidth: 35,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderColor: 'white',
  },
  playButton: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

