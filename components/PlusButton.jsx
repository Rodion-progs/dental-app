import React from 'react';

import styled from 'styled-components/native';
import {Ionicons} from '@expo/vector-icons';

const PlusButton = ({ onPress }) => {
  return (
    <PlusButtonWrap
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Ionicons name="ios-add" size={24} color="white" />
    </PlusButtonWrap>
    )

}
export default PlusButton;

const PlusButtonWrap = styled.TouchableOpacity`
  position: absolute;
  right: 25px;
  bottom: 25px;
  z-index: 60;
  align-items: center;
  justify-content: center;
  border-radius: 64px;
  width: 64px;
  height: 64px;
  background-color: #2A86FF;
  shadow-color: #2A86FF;
  shadow-opacity: 0.5;
  shadow-radius: 3.5px;
  elevation: 5;
`;
