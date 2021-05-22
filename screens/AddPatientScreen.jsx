import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {  Header, Content, Form, Item, Input, Label } from 'native-base'
import { Container} from '../components';
import styled from 'styled-components/native';
import { AppButton, GrayText, Badge } from '../components';
// import  from '../components/GrayText';
import baseUrl from '../utils/api/baseUrl';
import { Foundation, Ionicons, Fontisto } from '@expo/vector-icons';
import axios from 'axios';


const AddPatientScreen = ({ navigation }) => {
  const [values, setValues] = useState({});
  const handleChange = (name, e) => {
    const text = e.nativeEvent.text;
    setValues({
      ...values,
      [name]: text
    });
  }
  const onSubmit = () => {
    axios.post(baseUrl + '/patients/', values)
      .then(() => {

        navigation.navigate('Patients');
      })
      .catch(e => console.log('BAD', e))
  }

  return (
    <Container>
      <Content refreshing={true}>
        <Form>
          <Item floatingLabel >
            <Label>Имя и фамилия</Label>
            <Input
              onChange={handleChange.bind(this, 'fullName')}
              value={values.fullName}
              autofocus
              style={{marginTop: 12}} />
          </Item>
          <Item floatingLabel>
            <Label>Телефон</Label>
            <Input
              onChange={handleChange.bind(this, 'phone')}
              value={values.phone}
              dataDetectorTypes="phoneNumber"
              keyboardType="phone-pad"
              style={{marginTop: 12}} />
          </Item>
            <ButtonView>
              <AddButton onPress={onSubmit} color="#87CC6F">
                <Ionicons name="ios-add" size={24} color="white" />
                Добавить пациента
              </AddButton>
            </ButtonView>
        </Form>
      </Content>
    </Container>
  )
};

const AddButton = styled(AppButton)`
  align-items: flex-end;
  lineHeight: 20px
`

const ButtonView = styled.View`
  flex: 1;
  margin-top: 20;
  
`

AddPatientScreen.navigationOptions = {
  title: 'Добавить пациента',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8
  }
};

export default AddPatientScreen;
