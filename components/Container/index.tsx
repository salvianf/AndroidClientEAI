import React, {FunctionComponent} from 'react';
import styled from 'styled-components/native';
import {ContainerProps} from './types';
import {colors} from '../colors';
const {primary} = colors;

const StyledView = styled.View`
  flex: 1;
  padding: 25px;
  passing-top: 40px;
  background-color: ${primary};
`;

const MainContainer: FunctionComponent<ContainerProps> = props => {
  return <StyledView style={props.style}>{props.children}</StyledView>;
};
export default MainContainer;
