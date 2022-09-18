import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Dashboard} from '../screens/home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LoanStack} from './LoanStack';
import {ProfileStack} from './ProfileStack';
import {DashboardStack} from './DashboardStack';

export type homeBottomTabParams = {
  DashboardStack: undefined;
  ProfileStack: undefined;
  LoanStack: undefined;
};

const Tab = createBottomTabNavigator<homeBottomTabParams>();

export const HomeTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="LoanStack"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 4,
        },
      }}>
      <Tab.Screen
        name="DashboardStack"
        component={DashboardStack}
        options={{
          tabBarLabel: 'Estadísticas',
          tabBarIcon: ({color}) => (
            <Ionicons name="stats-chart-outline" color={color} size={18} />
          ),
        }}
      />
      <Tab.Screen
        name="LoanStack"
        component={LoanStack}
        options={{
          tabBarLabel: 'Préstamos',
          tabBarIcon: ({color}) => (
            <Ionicons name="wallet-outline" color={color} size={18} />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({color}) => (
            <Ionicons name="person-outline" color={color} size={18} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
