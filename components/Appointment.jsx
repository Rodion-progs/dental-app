import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import GrayText from './GrayText';
import Badge from './Badge';
import getAvatarColor from '../utils/getAvatarColor';


const Appointment = ({ item, navigate  }) => {
  const { patient, diagnosis, active, time } = item;
  const firstLetterName = patient.fullName[0].toUpperCase();
  const avatarColors = getAvatarColor(firstLetterName);
  return (
      <GroupItem
       onPress={navigate.bind(this, 'Patient', item)}
       activeOpacity={0.6}
      >
        <Avatar style={{backgroundColor: avatarColors.background}}>
          <Letter style={{color: avatarColors.color}}>
            { firstLetterName }
          </Letter>
        </Avatar>
        <View>
          <FullName>{ patient.fullName }</FullName>
          <GrayText>{ diagnosis }</GrayText>
        </View>
        {time && <Badge style={{marginLeft: 'auto'}} active={active}>{time}</Badge>}
      </GroupItem>)
};

Appointment.defaultProps = {
  groupTitle: 'Untitled',
  items: []
}

const Letter = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
`

const GroupItem = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  padding: 10px 15px;
  border-bottom-width: 1px;
  border-bottom-color: #F3F3F3;
`;

const Avatar = styled.View`
  margin-right: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

const FullName = styled.Text`
  font-weight: 800;
  font-size: 16px;
  color: #000000;
`;

// const GroupDate = styled.Text`
//   background: ${props => props.active ? '#2A86FF' : '#E9F5FF'};
//   color: ${props => props.active ? '#FFFFFF' : '#4294FF'};
//   margin-left: auto;
//   padding: 8px 14px;
//   font-size: 14px;
//   line-height: 17px;
//   font-weight: 600;
//   border-radius: 18px;
// `;



export default Appointment;
