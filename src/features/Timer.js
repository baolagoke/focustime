import React, { useState } from 'react';
import { View, Text, Vibration, Platform, StyleSheet} from 'react-native';
import {ProgressBar} from 'react-native-paper'; 
import { useKeepAwake } from 'expo-keep-awake';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import {Timing} from './Timing';
import {spacing} from '../utils/sizes'; 
import {colors} from '../utils/colors';


export const Timer = ({ focusSubject, clearSubject , onTimerEnd}) => {

  useKeepAwake(); 
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);  
  const [minutes, setMinutes] = useState(0.1);

  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [ 
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
  ];


    const onEnd = (reset) =>{
      Vibration.vibrate(PATTERN);
      setIsStarted(false);
      setProgress(1); 
      reset(); 
      onTimerEnd(focusSubject);
    }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
        minutes = {minutes}
          isPaused={!isStarted}
          onProgress= {setProgress}
          onEnd={onEnd}
        />
        <View style={{paddingTop: spacing.sm}}>
          <Text style= {styles.title}> Focusing on:</Text>
          <Text style= {styles.task}>{focusSubject} </Text>
        </View> 
      </View>

      <View style ={{ paddingTop: spacing.sm}}>
          <ProgressBar 
          progress = {progress}
          color = {colors.progressBar } 
          style = {{height: spacing.sm}}/>
          
      </View>
        <View style ={styles.timingWrapper}>
          <Timing onChangeTime = {setMinutes}/> 
      </View>
    
      <View style={styles.buttonWrapper}>
        {!isStarted && (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
        {isStarted && (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style = {styles.clearSubjectWrapper}>
        <RoundedButton size={50} title = "clear" onPress = {clearSubject}/> 
      <View/> 
    </View>
  );
};

const style = StyleSheet.create({
    container: {
    flex: 1
    
  },

   countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },


    clearSubjectWrapper: {
    flex: 'row',
    justifyContent: 'center',
  },

  timingWrapper: {

      flex: 0.1,
      paddingTop: spacing.xxl,
      flexDirection: 'row',

  },

  buttonWrapper: {
    flex: 0.3,
    padding: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  task: {
    color: colors.white,
    textAlign: 'center',


  },
});
