import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card.component';
import CustomButton from '../components/CustomButton.component';
import Input from '../components/Input.component';
import NumberContainer from '../components/Number-container.component';
import BodyText from '../components/BodyText.component';

import COLORS from '../constants/colors';
import TitleText from '../components/TitleText.component';

const StartGameScreen = (props) => {
  const { onStartGame } = props;

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(undefined);
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get('window').width / 4
  );

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };

    Dimensions.addEventListener('change', updateLayout);
    console.log('Change layout');
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  }, [Dimensions.get('window')]);

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const selectedNumber = parseInt(enteredValue);
    if (isNaN(selectedNumber) || selectedNumber <= 0 || selectedNumber >= 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99.',
        [{ text: 'Ok', style: 'destructive', onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    setEnteredValue('');
    setSelectedNumber(parseInt(enteredValue));
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>You selected</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <CustomButton onPress={() => onStartGame(selectedNumber)}>
          START GAME
        </CustomButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game!</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText>Select a Number</BodyText>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCorrect={false}
                maxLength={2}
                keyboardType='number-pad'
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <CustomButton
                  styleButton={{ width: buttonWidth }}
                  onPress={resetInputHandler}
                >
                  <Ionicons name='ios-close' size={28} color='white' />
                </CustomButton>
                <CustomButton
                  styleButton={{ width: buttonWidth }}
                  onPress={confirmInputHandler}
                >
                  <Ionicons name='ios-checkmark' size={28} color='white' />
                </CustomButton>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open-sans-bold',
  },
  inputContainer: {
    width: '80%',
    minWidth: 400,
    maxWidth: '95%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  input: {
    width: '99%',
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
  },
});

export default StartGameScreen;
