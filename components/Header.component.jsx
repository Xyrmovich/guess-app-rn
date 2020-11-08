import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import TitleText from './TitleText.component';

import COLORS from '../constants/colors';

const Header = (props) => {
  return (
    <View style={styles.header}>
      <TitleText>{props.title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
