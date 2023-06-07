import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';

const Stopwatch: React.FC<{ timer: number, onTimerClicked: (isTimerOn: boolean) => void }> = ({
    timer,
    onTimerClicked
}) => {
  const [time, setTime] = useState(timer);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  React.useEffect(()=>{
    setIsRunning(true)
  })
  React.useEffect(()=>{
    console.log("Running the program")
    handleStart();
  }, [isRunning])

  const handleStart = () => {
    intervalRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 10);
      timer = time;
    }, 10);
  };

  const handleStop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const formatTime = (time) => {
    const min = Math.floor(time / 60000);
    const sec = Math.floor((time % 60000) / 1000);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formatTime(time)}</Text>
      {/* <Button title={"Start"} onPress={handleStart}/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  time: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Stopwatch;