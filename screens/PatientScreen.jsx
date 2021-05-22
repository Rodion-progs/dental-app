import React, { useEffect, useState } from 'react';
import {Text, View, ActivityIndicator, Linking} from 'react-native';
import styled from 'styled-components/native';
import { AppButton, GrayText, Badge, PlusButton } from '../components';
import baseUrl from '../utils/api/baseUrl';
import phoneFormat from '../utils/phoneFormat';

// import  from '../components/GrayText';
import { Foundation, Ionicons, Fontisto } from '@expo/vector-icons';
import axios from 'axios';
import patients from '../utils/api/patients';


const PatientScreen = ({ navigation }) => {
  const [ appointments, setAppointments ] = useState([])
  const [ isLoading, setIsloading ] = useState(true)
  useEffect(() => {
    setIsloading(true)
    const url = `${baseUrl}/patients/${navigation.getParam('patient')._id}`;
    axios.get(url).then(({data}) => {
      setAppointments(data.data.appointments);
      setIsloading(false)
    })
      .catch(e => {
        setIsloading(false)
        console.log(e)
      })
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <PatientDetails>

        <PatientFullName>{ navigation.getParam('patient', {}).fullName }</PatientFullName>
        <GrayText>{ phoneFormat(navigation.getParam('patient', {}).phone) }</GrayText>

        <PatientButtons>
          <FormulaButtonView>
            <FormulaButton>Формула зубов</FormulaButton>
          </FormulaButtonView>
          <PhoneButtonView>
            <PhoneButton color="#84d269" onPress={() => Linking.openURL(`tel:${phoneFormat(navigation.getParam('patient', {}).phone)}`)}>
              <Foundation name="telephone" size={22} color="white" />
            </PhoneButton>
          </PhoneButtonView>
        </PatientButtons>
      </PatientDetails>

      <PatientAppointment>
        <Container>
          {isLoading ? <ActivityIndicator size="large" color="2A86FF"/> : appointments && appointments.map(appointment => (
            <AppointmentCard key={appointment._id}>
              <MoreButton>
                <Fontisto  name="more-v-a" size={16} color="#A3A3A3" />
              </MoreButton>
              <AppointmentCardRow>
                <Ionicons name="md-medical" size={24} color="rgba(0, 0, 0, 0.5)" />
                <AppointmentCardLabel>Зуб: <Text style={{ fontWeight: '900' }}>{appointment.toothNumber}</Text></AppointmentCardLabel>
              </AppointmentCardRow>
              <AppointmentCardRow>
                <Foundation name="clipboard-notes" size={16} color="#A3A3A3" />
                <AppointmentCardLabel>Диагноз: <Text style={{ fontWeight: '900' }}>{appointment.diagnosis}</Text></AppointmentCardLabel>
              </AppointmentCardRow>
              <AppointmentCardRow style={{ marginTop: 15, justifyContent: 'space-between' }}>
                <Badge style={{ width: 155, marginRight: 'auto' }} active>{appointment.date} - {appointment.time}</Badge>
                <Badge color="green">{appointment.price} Р</Badge>
              </AppointmentCardRow>
            </AppointmentCard>
          ))}
        </Container>
      </PatientAppointment>
      <PlusButton onPress={navigation.navigate.bind(this, 'AddAppointment', {patientId: navigation.getParam('patient', {})._id})} />
    </View>
  )
};

const MoreButton  = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 10px;
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const AppointmentCardRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
  margin-top: 4px;
`

const AppointmentCardLabel = styled.Text`
  font-size: 16px;
  margin-left: 10px;
`

const AppointmentCard = styled.View`
  shadow-color: gray;
  shadow-opacity: 0.5;
  shadow-radius: 10px;
  elevation: 0.4;
  padding: 20px 25px;
  margin-bottom: 15px;
  border-radius: 10px;
  background-color: #FFFFFF;
`

const Container = styled.View`
  padding: 15px
`;

const PatientDetails = styled(Container)`
  flex: 0.3;
`

const PatientAppointment = styled.ScrollView`
  flex: 1;
  background-color: #F8fAFD;
`

const FormulaButtonView = styled.View`
  flex-grow: 1;
  margin-right: 10px
`;

const PhoneButtonView = styled.View`
  width: 45px;
`;

const FormulaButton = styled(AppButton)`
  align-items: stretch;
  margin-right: 10px
`

const PhoneButton = styled(AppButton)`
  width: 45px;
  height: 45px;
  background-color: #84d269;
  border-radius: 500px;
`

const PatientButtons = styled.View`
  flex-direction: row;
  margin-top: 20px;
`

const PatientFullName = styled.Text`
  margin-bottom: 10px;
  font-weight: 800;
  font-size: 24px;
  line-height: 30px;
`;



PatientScreen.navigationOptions = {
    title: 'Карта пациента',
    headerTintColor: '#2A86FF',
    headerStyle: {
      elevation: 0.8,
      shadowOpacity: 0.8
    }
  };

export default PatientScreen;
