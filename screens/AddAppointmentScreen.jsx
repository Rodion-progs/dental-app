import React, {useState} from 'react';
import {Text, View, Button} from 'react-native';
import {  Header, Content, Form, Item, Input, Label, Picker, Icon } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Container} from '../components';
import styled from 'styled-components/native';
import { AppButton, GrayText, Badge } from '../components';
import baseUrl from '../utils/api/baseUrl';
// import  from '../components/GrayText';
import { Foundation, Ionicons, Fontisto } from '@expo/vector-icons';
import axios from 'axios';


const AddAppointmentScreen = ({ navigation }) => {
  const toDateString = (date) =>  {
    return `${date.getFullYear()}-${date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`
  };
  const toTimeString = (date) => {
    return date.toLocaleTimeString('ru-Ru', {
      hour: '2-digit',
      minute: '2-digit',
    }).substring(0, 5)
  }
  const [date, setDate] = useState(new Date());
  const [values, setValues] = useState({
    date: toDateString(date),
    time: toTimeString(date),
    diagnosis: 'Пульпит',
    toothNumber: '',
    price: '',
    patient: navigation.getParam('patientId')
  });

  const fieldsName = {
    date: "дата",
    time: "время",
    diagnosis: 'диагноз',
    toothNumber: 'номер зуба',
    price: 'цена',
    patient: "пациент"
  }

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const setFieldValue = (name, value) => {
    setValues({
      ...values,
      [name]: value
    })
  };
  const onChange = (event, selectedDate, mode) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setValues({
      ...values,
      date: toDateString(selectedDate),
      time: toTimeString(selectedDate),
    })
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const handleChange = (name, e) => {
    const text = e.nativeEvent.text;
    setFieldValue(name, text);
  }
  const onSubmit = () => {
    axios.post(baseUrl + '/appointments' , values)
      .then(() => {

        navigation.navigate('Home', {lastUpdate: new Date()});
      })
      .catch(e => {
        console.log('BAD', e)
        if (e.response.data && e.response.data.message) {
          console.log('BAD', e.response.data)
          const fieldName = e.response.data.message[0].param
          alert(`Ошибка! Поле ${fieldsName[fieldName]} указано неверно`)
        }
      })
  }

  return (
    <Container>
      <Content refreshing={true}>
        <Form>
          <Item floatingLabel >
            <Label>Номер зуба</Label>
            <Input
              onChange={handleChange.bind(this, 'toothNumber')}
              value={values.toothNumber}
              keyboardType="numeric"
              autofocus
              style={{marginTop: 5}} />
          </Item>
          <Item floatingLabel >
            <Label>Цена</Label>
            <Input
              onChange={handleChange.bind(this, 'price')}
              value={values.price}
              keyboardType="numeric"
              style={{marginTop: 5}} />
          </Item>
          <Item>
            <Picker
              mode="dropdown"
              placeholder="Диагноз"
              iosIcon={<Icon name="arrow-down" />}
              headerStyle={{ backgroundColor: "#b95dd3" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              style={{ width: '100%', height: 40, marginTop: 10}}
              onValueChange={setFieldValue.bind(this, 'diagnosis')}
            >
              <Picker.Item label="Пульпит" value="Пульпит" />
              <Picker.Item label="Кариес" value="Кариес" />
              <Picker.Item label="Спид" value="Спид" />
            </Picker>
          </Item>


          <Item style={{marginTop: 12}}>
            <ItemRow>
              <ItemDate onPress={showDatepicker}>
                  { toDateString(date) }
              </ItemDate>
              <ItemDate onPress={showTimepicker}>
                { toTimeString(date) }
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </ItemDate>
            </ItemRow>
          </Item>



          <ButtonView>
            <AddButton onPress={onSubmit} color="#87CC6F">
              <Ionicons name="ios-add" size={24} color="white" />
              Добавить прием
            </AddButton>
          </ButtonView>
        </Form>
      </Content>
    </Container>
  )
};
const ItemRow = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`
const ItemDate = styled.Text`
  width: 48%;
  padding: 5px;
  font-size: 16px;
  align-items: center;
  text-align: center;
`
const AddButton = styled(AppButton)`
  align-items: flex-end;
  lineHeight: 20px
`

const ButtonView = styled.View`
  flex: 1;
  margin-top: 20;

`

AddAppointmentScreen.navigationOptions = {
  title: 'Добавить приём',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8
  }
};

export default AddAppointmentScreen;
