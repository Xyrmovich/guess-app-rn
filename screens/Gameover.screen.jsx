import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton.component';

const GameOverScreen = (props) => {
  const { numOfRounds, userNumber, onRestartGame } = props;
  return (
    <View>
      <Text>The Game is Over!</Text>
      <Text>Number of Rounds: {numOfRounds}</Text>
      <Text>Number was: {userNumber}</Text>
      <CustomButton title="NEW GAME" onPress ={onRestartGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameOverScreen;
