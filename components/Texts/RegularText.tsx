import React, {FunctionComponent} from 'react';
// import styled from 'styled-components/native';
import {TextProps} from './types';
import {Text, StyleSheet} from 'react-native';
import {colors} from '../colors';
const {danger} = colors;

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    color: danger,
    textAlign: 'left',
  },
});

const RegularText: FunctionComponent<TextProps> = props => {
  return <Text style={styles.text}>{props.children}</Text>;
};
export default RegularText;
