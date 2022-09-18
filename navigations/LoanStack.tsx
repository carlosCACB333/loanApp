import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {Loan, LoanDetail} from '../screens/home';
import {useTheme} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';

export type LoanStackParams = {
  Loan: undefined;
  Detail: {
    id: string;
    isLender: boolean;
  };
};

export interface LoanScreenProps<T extends keyof LoanStackParams>
  extends NativeStackScreenProps<LoanStackParams, T> {}

export interface LoanNavigatorProps<T extends keyof LoanStackParams>
  extends NavigationProp<LoanStackParams, T> {}

const Stack = createNativeStackNavigator<LoanStackParams>();
export const LoanStack = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Loan"
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
        name="Loan"
        component={Loan}
        options={{
          title: 'Mis prestamos',
        }}
      />
      <Stack.Screen
        name="Detail"
        component={LoanDetail}
        options={{
          title: 'Detalle de préstamo',
        }}
      />
    </Stack.Navigator>
  );
};
