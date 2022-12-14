import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Login, Signup} from '../screens/auth';
import {useTheme} from 'react-native-paper';

export type authStackParams = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};
const Stack = createNativeStackNavigator<authStackParams>();

export const AuthStack = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitle: '',
        contentStyle: {
          paddingHorizontal: 32,
        },
        navigationBarHidden: true,
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};
