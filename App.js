import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { HomeScreen, PatientScreen, AddPatientScreen, AddAppointmentScreen, PatientsScreen } from './screens';


const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Patient: {
    screen: PatientScreen,
  },
  AddPatient: {
    screen: AddPatientScreen,
  },
  AddAppointment: {
    screen: AddAppointmentScreen,
  },
  Patients: {
    screen: PatientsScreen,
  },
},
  {
    initialRouteName: 'Home'
  });

export default createAppContainer(AppNavigator);



