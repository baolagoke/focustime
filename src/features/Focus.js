import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import {RoundedButton} from '../components/RoundedButton';
import {spacing} from '../utils/sizes'

export const Focus = ({addSubject}) => {
  const [subject, setSubject] = useState(null);
  console.log(subject);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
        style = {styles.textInput}
          label="What would you like to focus on ?"
          onChangeText={setSubject}
        />
      <View style = {styles.button}>
        <RoundedButton  title ="+"  size={50} onPress={() => addSubject(subject)} /> 
      </View> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
button: {
    justifyContent: 'center', 
},

  textInput: {
    flex: 1,
    marginRight: spacing.sm, 
  },
  inputContainer: {
  
    padding: spacing.lg,
    justifyContent: 'top',
    flexDirection: 'row'
  },
});
