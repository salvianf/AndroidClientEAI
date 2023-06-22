import React, {FunctionComponent} from 'react';
// import styled from 'styled-components/native';
import {TextProps} from './types';
import {Text, StyleSheet} from 'react-native';
import {colors} from '../colors';
const {warning} = colors;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: warning,
    fontWeight: '500',
    textAlign: 'left',
  },
});

const BigText: FunctionComponent<TextProps> = props => {
  return (
    <Text style={styles.text} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};
export default BigText;
