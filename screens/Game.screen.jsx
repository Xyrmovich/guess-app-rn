import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/Number-container.component';
import Card from '../components/Card.component';
import CustomButton from '../components/CustomButton.component';
import BodyText from '../components/BodyText.component';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const rndNumb = Math.floor(Math.random() * (max - min) + min);
  if (rndNumb === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNumb;
  }
};

const renderListItem = (value, idx) => (
  <View key={idx} style={styles.listItem}>
    <BodyText>#{idx}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

const GameScreen = (props) => {
  const { userChoice, onGameOver } = props;
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  );

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const currentMin = useRef(1);
  const currentMax = useRef(100);

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      currentMax.current = currentGuess;
    } else {
      currentMin.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentMin.current,
      currentMax.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    //setRounds((currentRounds) => currentRounds + 1);
    setPastGuesses((prevGuesses) => [nextNumber, ...prevGuesses]);
  };

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  }, [Dimensions.get('window')]);

  const gameControl =
    availableDeviceHeight < 500 ? (
      <Card style={styles.buttonContainer}>
        <CustomButton onPress={() => nextGuessHandler('lower')}>
          <Ionicons name='md-remove' size={24} color='white' />
        </CustomButton>
        <NumberContainer>{currentGuess}</NumberContainer>
        <CustomButton onPress={() => nextGuessHandler('greater')}>
          <Ionicons name='md-add' size={24} color='white' />
        </CustomButton>
      </Card>
    ) : (
      <>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
          <CustomButton onPress={() => nextGuessHandler('lower')}>
            <Ionicons name='md-remove' size={24} color='white' />
          </CustomButton>
          <CustomButton onPress={() => nextGuessHandler('greater')}>
            <Ionicons name='md-add' size={24} color='white' />
          </CustomButton>
        </Card>
      </>
    );

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      {gameControl}
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '2.5%',
    width: 400,
    maxWidth: '80%',
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  listContainer: {
    width: Dimensions.get('window').width > 350 ? '60%' : '80%',
    flex: 1,
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});

export default GameScreen;
