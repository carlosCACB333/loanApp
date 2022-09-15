import {View} from 'react-native';
import React, {useContext} from 'react';
import {Avatar, Button, Text, useTheme} from 'react-native-paper';
import {Br} from '../../components';
import {AuthContext} from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ax} from '../../utils/ax';
import {globals} from '../../styles/globals';
import {useAppDispatch} from '../../app/hooks';
import {resetState} from '../../app/loanSlice';
import {ProfileScreenProps} from '../../navigations/ProfileStack';

export const Profile = ({navigation}: ProfileScreenProps<'ProfileHome'>) => {
  const theme = useTheme();
  const {setLogout, user} = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const onLogout = () => {
    AsyncStorage.removeItem('token');
    ax.defaults.headers.common.Authorization = '';
    dispatch(resetState());
    setLogout();
  };

  if (!user) {
    return null;
  }

  return (
    <View style={globals.center}>
      <Br />
      <Br />
      {user.photo ? (
        <Avatar.Image
          size={120}
          source={{
            uri: user.photo,
          }}
        />
      ) : (
        <Avatar.Text
          label={user.firstName.charAt(0) + user.lastName.charAt(0)}
          size={120}
        />
      )}
      <Br />
      <Text style={globals.title}>{user.firstName + ' ' + user.lastName}</Text>
      <Text style={globals.subTitle}>{user.email}</Text>
      <Br />
      <Br />
      <View style={{...globals.row}}>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('UpdateProfile')}>
          Actualizar datos
        </Button>
        <Br />
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('ChangePassword')}>
          Cambiar contraseña
        </Button>
      </View>
      <Br />
      <Br />
      <Button textColor={theme.colors.error} onPress={onLogout}>
        Cerrar Sesión
      </Button>
    </View>
  );
};
