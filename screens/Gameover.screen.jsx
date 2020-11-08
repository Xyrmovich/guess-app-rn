import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

import CustomButton from '../components/CustomButton.component';
import BodyText from '../components/BodyText.component';
import TitleText from '../components/TitleText.component';

import COLORS from '../constants/colors';

const GameOverScreen = (props) => {
  const { numOfRounds, userNumber, onRestartGame } = props;
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is Over!</TitleText>
        <View style={styles.imageContainer}>
          <Image
            fadeDuration={500}
            style={styles.image}
            //source={require('../assets/success.png')}
            resizeMode='stretch'
            source={{
              uri:
                'https://em.wattpad.com/acd0fcba948b51d2dcde37cfac2d35463d41d81e/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f6c794430734649664b4d355f73773d3d2d342e313562643036626235393037333063643131343134323931303030372e6a7067?s=fit&w=720&h=720',
            }}
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            Your phone needed{' '}
            <Text style={styles.highlight}>{numOfRounds}</Text> rounds to to
            guess the number <Text style={styles.highlight}>{userNumber}</Text>
          </BodyText>
        </View>
        <CustomButton style={styles.button} onPress={onRestartGame}>
          NEW GAME
        </CustomButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '1.5%'
  },
  button: {
    marginTop: 10,
    width: '50%',
  },
  imageContainer: {
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderWidth: 3,
    borderColor: 'black',
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    overflow: 'hidden',
    marginVertical: '3.5%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultContainer: {
    width: '80%',
    marginHorizontal: 30,
    marginVertical: '1.5%',
  },
  resultText: {
    fontSize: Dimensions.get('window').height < 400 ? 18 : 16,
    textAlign: 'center',
  },
  highlight: {
    color: COLORS.primary,
    fontFamily: 'open-sans-bold',
  },
});

export default GameOverScreen;
