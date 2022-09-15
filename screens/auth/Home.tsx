import React from 'react';

import {Button, Text} from 'react-native-paper';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {authStackParams} from '../../navigations/Auth';
import {Br} from '../../components';
import {AuthLayout} from '../../layouts';
import {Image, StyleSheet} from 'react-native';

type Props = NativeStackScreenProps<authStackParams, 'Home'>;
// import {useTheme} from '@react-navigation/native';
export const Home = ({navigation}: Props) => {
  return (
    <AuthLayout>
      <Image source={require('../../assets/phone.png')} style={styles.img} />
      <Br />
      <Text style={styles.text}>
        Administra tus pagos, dedudas y gastos de una manera sencilla y segura.
      </Text>
      <Br />
      <Br />
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('Login');
        }}>
        Login
      </Button>
      <Br />
      <Button
        mode="outlined"
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        Signup
      </Button>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  img: {
    alignSelf: 'center',
    maxHeight: 400,
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
