import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useTheme} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
import {ChangePassword, Profile, UpdateProfile} from '../screens/auth';

export type ProfileStackParams = {
  ProfileHome: undefined;
  UpdateProfile: undefined;
  ChangePassword: undefined;
};

export interface ProfileScreenProps<T extends keyof ProfileStackParams>
  extends NativeStackScreenProps<ProfileStackParams, T> {}

export interface ProfileNavigatorProps<T extends keyof ProfileStackParams>
  extends NavigationProp<ProfileStackParams, T> {}

const Stack = createNativeStackNavigator<ProfileStackParams>();
export const ProfileStack = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="ProfileHome"
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
      }}>
      <Stack.Screen
        name="ProfileHome"
        component={Profile}
        options={{
          title: 'Mi perfil',
        }}
      />

      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{
          title: 'Actualizar perfil',
        }}
      />

      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: 'Cambiar contraseña',
        }}
      />
    </Stack.Navigator>
  );
};
