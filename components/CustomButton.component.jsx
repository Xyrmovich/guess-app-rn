import React from 'react';
import { Button, View } from 'react-native';

const CustomButton = (props) => {
  const { title, style, color, onPress } = props;
  return (
    <View style={style ? style : null}>
      <Button title={title ? title : ''} color={color} onPress={onPress} />
    </View>
  );
};

export default CustomButton;
