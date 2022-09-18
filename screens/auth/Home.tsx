import React from 'react';

import {Button, Text} from 'react-native-paper';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {authStackParams} from '../../navigations/AuthStack';
import {Br} from '../../components';
import {AuthLayout} from '../../layouts';
import {Image, StyleSheet, View} from 'react-native';
import {globals} from '../../styles';

type Props = NativeStackScreenProps<authStackParams, 'Home'>;
// import {useTheme} from '@react-navigation/native';
export const Home = ({navigation}: Props) => {
  return (
    <AuthLayout>
      <Image source={require('../../assets/phone.png')} style={styles.img} />
      <Br />
      <Text style={styles.text}>
        Administra tus deudas y pagos de una manera sencilla y segura.
      </Text>
      <Br />
      <Br />

      <Button
        style={globals.btn}
        mode="contained"
        onPress={() => {
          navigation.navigate('Login');
        }}>
        Iniciar sesión
      </Button>
      <Br />
      <Button
        style={globals.btn}
        mode="outlined"
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        Registrarse
      </Button>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  img: {
    alignSelf: 'center',
    width: '100%',
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
