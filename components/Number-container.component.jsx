import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import COLORS from '../constants/colors';

const NumberContainer = (props) => {
  const { children } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.number}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    color: COLORS.secondary,
    fontSize: 22,
  },
});

export default NumberContainer;
