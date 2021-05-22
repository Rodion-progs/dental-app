import React, { useState, useEffect } from 'react';
import {SectionList, Alert, TouchableOpacity} from 'react-native';
import {Appointment, SectionTitle, PlusButton} from '../components';
import {Ionicons} from '@expo/vector-icons';
import axios from 'axios';
import styled from 'styled-components/native';
import Swipeable from 'react-native-swipeable-row'
import { appointmentsApi, patientsApi } from '../utils/api'
import baseUrl from '../utils/api/baseUrl';

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAppointments = () => {
    setIsLoading(true);
    axios.get(baseUrl + '/appointments/')
      .then(({data}) => {
        setData(data.data);
      }).catch(e => {
      console.log(e);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  useEffect(() => {fetchAppointments()}, []);
  useEffect(() => {fetchAppointments()}, [navigation.state.params]);
  // useEffect(() => {
  //   setLastUpdateTime(new Date());
  // }, props.state.params);
  const removeAppointment = id => {
    Alert.alert(
      "Удаление приема",
      "Вы действительно хотите удалить приём",
      [
        {
          text: "Отмена",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Удалить", onPress: () => {
            const url = `${baseUrl}/appointments/${id}`;
            const result = data.map(group => {
              const data =  group.data.filter(item => item._id !== id);
              group.data = data;
              return group;
            })
            setData(result);
            setIsLoading(true)
            axios.delete(url).then(() => {
              setIsLoading(false);
              console.log('DELETE')
            }).then(() => fetchAppointments()).catch(e => {
              setIsLoading(false);
              console.log('error', e)
            })
          }}
      ]
    );

  }
  return (
    <Container>
      {data && <SectionList
        sections={data}
        keyExtractor={(item) => item._id}
        onRefresh={fetchAppointments}
        refreshing={isLoading}
        renderItem={({item}) => (
          <Swipeable key={item._id} rightButtonWidth={80} rightButtons={[
            <SwipeViewButton style={{ backgroundColor: '#B4C1CB' }}>
              <Ionicons name="md-create" color="white" size={24}/>
            </SwipeViewButton> ,
            <SwipeViewButton onPress={removeAppointment.bind(this, item._id)} style={{ backgroundColor: '#F85A5A'}}>
              <Ionicons name="ios-close" color="white" size={24}/>
            </SwipeViewButton>]}>
            <Appointment navigate={navigation.navigate} item={item} />
          </Swipeable>
         )}
        renderSectionHeader={({section: {title}}) => (
          <SectionTitle>{title}</SectionTitle>
        )}
      />}
      <PlusButton onPress={navigation.navigate.bind(this, 'AddPatient')} />
    </Container>
  )
};

HomeScreen.navigationOptions = ({navigation}) => (
  {
    title: 'Приёмы',
    headerTintColor: '#2A86FF',
    headerStyle: {
      elevation: 0.8,
      shadowOpacity: 0.8
    },
    headerRight: () => (
      <TouchableOpacity style={{ padding: 20 }} onPress={navigation.navigate.bind(this, 'Patients')}>
        <Ionicons name="md-people" color="blue" size={24}/>
      </TouchableOpacity>
    ),
  }
)

  ;

const SwipeViewButton = styled.TouchableOpacity`
  background-color: red;
  height: 100%;
  width: 80px
  align-items: center;
  justify-content: center;
  
`

const Container = styled.View`
  flex: 1;
`




export default HomeScreen;
