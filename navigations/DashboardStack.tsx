import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useTheme} from 'react-native-paper';
import {Dashboard} from '../screens/home';

export type DashboardStackParams = {
  Dashboard: undefined;
};

export interface DashboardScreenProps<T extends keyof DashboardStackParams>
  extends NativeStackScreenProps<DashboardStackParams, T> {}

const Stack = createNativeStackNavigator<DashboardStackParams>();

export const DashboardStack = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          fontSize: 20,
        },
        contentStyle: {
          paddingHorizontal: 12,
        },
        navigationBarHidden: true,
      }}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Mis estadisticas',
        }}
      />
    </Stack.Navigator>
  );
};
