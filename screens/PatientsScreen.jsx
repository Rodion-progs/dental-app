import React, {useEffect, useState} from 'react';
import {Alert, FlatList, View} from 'react-native';
import {Appointment, PlusButton, SectionTitle} from '../components';
import {Item, Input} from 'native-base';
import {Ionicons} from '@expo/vector-icons';
import axios from 'axios';
import styled from 'styled-components/native';
import Swipeable from 'react-native-swipeable-row'
import baseUrl from '../utils/api/baseUrl';
import phoneFormat from '../utils/phoneFormat';

const PatientsScreen = ({navigation}) => {
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const fetchPatients = () => {
    setIsLoading(true);
    axios.get(baseUrl + '/patients/')
      .then(({data}) => {
        setData(data.data);
      }).catch(e => {
      console.log(e);
    }).finally(() => {
      setIsLoading(false);
    });
  }


  useEffect(() => {fetchPatients()}, []);
  useEffect(() => {fetchPatients()}, [navigation.state.params]);

  const onSearch = e => {
    setSearchValue(e.nativeEvent.text)
  }
  // useEffect(() => {
  //   setLastUpdateTime(new Date());
  // }, props.state.params);
  const removePatient = id => {
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
            const url = `${baseUrl}/patient/${id}`;
            const result = data.map(group => {
              group.data = group.data.filter(item => item._id !== id);
              return group;
            })
            setData(result);
            setIsLoading(true)
            axios.delete(url).then(() => {
              setIsLoading(false);
              console.log('DELETE')
            }).then(() => fetchPatients()).catch(e => {
              setIsLoading(false);
              console.log('error', e)
            })
          }}
      ]
    );

  }
  return (
    <Container>
      {data &&
      <>
        <View style={{ paddingLeft: 15, paddingRight: 15 }}>
          <Item>
            <Input onChange={onSearch} placeholder="Найти пациента"></Input>
          </Item>
        </View>

        <FlatList
          data={data.filter(item =>
            item.fullName.toString().toLowerCase().indexOf(searchValue.toString().toLowerCase()) >= 0)}
          keyExtractor={(item) => item._id}
          onRefresh={fetchPatients}
          refreshing={isLoading}
          renderItem={({item}) => (
            <Swipeable key={item._id} rightButtonWidth={80} rightButtons={[
              <SwipeViewButton style={{ backgroundColor: '#B4C1CB' }}>
                <Ionicons name="md-create" color="white" size={24}/>
              </SwipeViewButton> ,
              <SwipeViewButton onPress={removePatient.bind(this, item._id)} style={{ backgroundColor: '#F85A5A'}}>
                <Ionicons name="ios-close" color="white" size={24}/>
              </SwipeViewButton>]}>
              <Appointment navigate={navigation.navigate} item={{
                patient: item,
                diagnosis: phoneFormat(item.phone)
              }} />
            </Swipeable>
          )}
          renderSectionHeader={({section: {title}}) => (
            <SectionTitle>{title}</SectionTitle>
          )}
        />
      </>}
      <PlusButton onPress={navigation.navigate.bind(this, 'AddPatient')} />
    </Container>
  )
};

PatientsScreen.navigationOptions = {
  title: 'Пациенты',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8
  }
};

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

export default PatientsScreen;
