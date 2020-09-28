import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import NumberContainer from '../components/Number-container.component';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton.component';

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

const GameScreen = (props) => {
  const { userChoice, onGameOver } = props;
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, userChoice)
  );
  const [rounds, setRounds] = useState(0);

  useEffect(() => {
    if(currentGuess === userChoice){
      onGameOver(rounds);
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

    if(direction === 'lower'){
      currentMax.current = currentGuess;
    } else{
      currentMin.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(currentMin.current, currentMax.current, currentGuess);
    setCurrentGuess(nextNumber);
    setRounds(currentRounds => currentRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <CustomButton title="Lower" onPress={() => nextGuessHandler('lower')} />
        <CustomButton
          title="Greater"
          onPress={() => nextGuessHandler('greater')}
        />
      </Card>
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
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
  },
});

export default GameScreen;
