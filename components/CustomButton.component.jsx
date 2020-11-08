import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import COLORS from '../constants/colors';

const CustomButton = (props) => {
  const { children, onPress, styleButton, styleText } = props;
  return (
    <View style={styleButton}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text style={{ ...styles.buttonText, ...styleText }}>{children}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18,
  },
});

export default CustomButton;
