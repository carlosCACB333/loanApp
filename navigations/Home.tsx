import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Dashboard} from '../screens/home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LoanStack} from './LoanStack';
import {ProfileStack} from './ProfileStack';

export type homeBottomTabParams = {
  Dashboard: undefined;
  Profile: undefined;
  LoanHome: undefined;
  Payment: undefined;
};

const Tab = createBottomTabNavigator<homeBottomTabParams>();

export const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName="LoanHome"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTitleStyle: {
          fontSize: 20,
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: true,
          headerTitle: 'Mis estadísticas',
          tabBarIcon: ({color}) => (
            <Ionicons name="stats-chart-outline" color={color} size={18} />
          ),
        }}
      />
      <Tab.Screen
        name="LoanHome"
        component={LoanStack}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="wallet-outline" color={color} size={18} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="person-outline" color={color} size={18} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
