import {Alert, StyleSheet, Text} from 'react-native';
import React, {useContext} from 'react';
import {Button, HelperText, TextInput} from 'react-native-paper';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {authStackParams} from '../../navigations/Auth';
import {AuthLayout} from '../../layouts';
import {Br} from '../../components';
import {useForm, Controller} from 'react-hook-form';
import {ax} from '../../utils/ax';
import {IUser} from '../../interfaces';
import {AuthContext} from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<authStackParams, 'Login'>;

interface ILogin {
  email: string;
  password: string;
}

export const Login = ({navigation}: Props) => {
  const {setLogin} = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors, isValid},
  } = useForm<ILogin>({mode: 'onChange'});

  const onSubmit = (data: ILogin) => {
    ax.post<{token: string; user: IUser}>('/auth/login', data)
      .then(res => {
        const token = res.data.token;
        const user = res.data.user;

        AsyncStorage.setItem('token', token);
        ax.defaults.headers.common.Authorization = `Bearer ${token}`;
        setLogin(user, token);
      })
      .catch(err => {
        const e = err.response.data;
        if (e?.fields) {
          const email = e.fields.email;
          const password = e.fields.password;
          if (email) {
            setError('email', {message: email});
          }
          if (password) {
            setError('password', {message: password});
          }
        } else {
          Alert.alert('Error', e?.message || 'Se ha producido un error');
        }
      });
  };

  return (
    <AuthLayout>
      <Text style={styles.text}>
        Inicia sesión para continuar con tu experiencia en nuestra app.
      </Text>
      <Br />
      <Br />
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'El correo es requerido',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'El correo no es válido',
          },
        }}
        render={({field: {onChange, value, onBlur}}) => (
          <TextInput
            value={value}
            label={'Correo'}
            onBlur={onBlur}
            mode="outlined"
            onChangeText={onChange}
            error={!!errors.email}
            keyboardType="email-address"
          />
        )}
      />
      <HelperText type="error">{errors?.email?.message}</HelperText>
      <Br />
      <Controller
        control={control}
        name="password"
        rules={{
          required: 'La contraseña es requerida',
          minLength: {
            value: 4,
            message: 'La contraseña debe tener al menos 4 caracteres',
          },
        }}
        render={({field: {onChange, value, onBlur}}) => (
          <TextInput
            value={value}
            label={'Contraseña'}
            mode="outlined"
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry
            error={!!errors.password}
          />
        )}
      />
      <HelperText type="error">{errors?.password?.message}</HelperText>
      <Br />
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}>
        Login
      </Button>
      <Button mode="text" onPress={() => navigation.replace('Signup')}>
        Registrarse
      </Button>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    paddingHorizontal: 20,
    fontSize: 18,
  },
});
