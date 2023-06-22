import React, {FunctionComponent} from 'react';
// import styled from 'styled-components/native';
import {TextProps} from './types';
import {Text, StyleSheet} from 'react-native';
import {colors} from '../colors';
const {secondary} = colors;

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: secondary,
    textAlign: 'left',
  },
});

const SmallText: FunctionComponent<TextProps> = props => {
  return <Text style={styles.text}>{props.children}</Text>;
};
export default SmallText;
