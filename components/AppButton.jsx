import React from 'react';
import styled from 'styled-components/native';
import {getBackgroundColor} from 'react-native/Libraries/LogBox/UI/LogBoxStyle';

const AppButton = ({ children, color, onPress }) => {
  return (
    <AppButtonWrapper onPress={onPress} color={color}><ButtonText>{ children }</ButtonText></AppButtonWrapper>
  );
};



const AppButtonWrapper = styled.TouchableOpacity`
  border-radius: 30px;
  background-color: ${props => props.color};
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 45px
`;

const ButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 400;
`;

AppButton.defaultProps = {
  color: '#2A86FF'
}

export default AppButton;
