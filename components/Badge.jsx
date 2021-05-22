import React from 'react';
import styled from 'styled-components/native';

const getColor = ({active, color}) => {
  const colors = {
    green: {
      background: 'rgba(132, 210, 105, 0.21)',
      color: '#61BB42'
    },
    active: {
      background: '#2A86FF',
      color: '#FFFFFF'
    },
    default: {
      background: '#E9F5FF',
      color: '#4294FF'
    }
  }
  if (active) {
    return colors.active;
  }
  if (color && colors[color]) {
    return colors[color];
  }
  return colors.default;
}

export default styled.Text`
  background: ${props => getColor(props).background}
  color: ${props => getColor(props).color};
  justify-content: center;
  padding: 8px 14px;
  font-size: 14px;
  line-height: 17px;
  font-weight: 600;
  text-align: center;
  border-radius: 18px;
`;
