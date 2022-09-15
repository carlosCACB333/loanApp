import {Text, Button, TextInput, HelperText} from 'react-native-paper';
import React, {useContext} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {authStackParams} from '../../navigations/Auth';
import {AuthLayout} from '../../layouts';
import {Br} from '../../components';
import {Alert, StyleSheet} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {AuthContext} from '../../context/AuthContext';
import {ax} from '../../utils/ax';
import {IUser} from '../../interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<authStackParams, 'Signup'>;

interface ISignup {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
export const Signup = ({navigation}: Props) => {
  const {setLogin} = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors, isValid},
  } = useForm<ISignup>({mode: 'onChange'});

  const onSubmit = (data: ISignup) => {
    ax.post<{token: string; user: IUser}>('/auth/signup', data)
      .then(res => {
        const token = res.data.token;
        const user = res.data.user;
        AsyncStorage.setItem('token', token);
        ax.defaults.headers.common.Authorization = `Bearer ${token}`;
        setLogin(user, token);
      })
      .catch(err => {
        const e = err.response.data;

        if (e.fields) {
          const email = e.fields.email;
          const password = e.fields.password;
          const passwordConfirmation = e.fields.passwordConfirmation;
          const firstName = e.fields.firstName;
          const lastName = e.fields.lastName;

          email && setError('email', {message: email});
          password && setError('password', {message: password});
          passwordConfirmation &&
            setError('passwordConfirmation', {message: passwordConfirmation});
          firstName && setError('firstName', {message: firstName});
          lastName && setError('lastName', {message: lastName});
        } else {
          Alert.alert('Error', e.message);
        }
      });
  };

  return (
    <AuthLayout>
      <Text style={styles.text}>
        Registrate para continuar con tu experiencia en nuestra app.
      </Text>
      <Br />
      <Br />
      <Controller
        control={control}
        name="firstName"
        rules={{
          required: 'El nombre es requerido',
        }}
        render={({field: {onChange, value, onBlur}}) => (
          <TextInput
            value={value}
            label={'Nombre'}
            onBlur={onBlur}
            mode="outlined"
            onChangeText={onChange}
            error={!!errors.firstName}
          />
        )}
      />
      <HelperText type="error">{errors?.firstName?.message}</HelperText>
      <Br />
      <Controller
        control={control}
        name="lastName"
        rules={{
          required: 'El apellido es requerido',
        }}
        render={({field: {onChange, value, onBlur}}) => (
          <TextInput
            value={value}
            label={'Apellido'}
            onBlur={onBlur}
            mode="outlined"
            onChangeText={onChange}
            error={!!errors.lastName}
          />
        )}
      />
      <HelperText type="error">{errors?.lastName?.message}</HelperText>
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
            label="Correo"
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
            label="Contraseña"
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
      <Controller
        control={control}
        name="passwordConfirmation"
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
            label="Confirmar contraseña"
            mode="outlined"
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry
            error={!!errors.passwordConfirmation}
          />
        )}
      />
      <HelperText type="error">
        {errors?.passwordConfirmation?.message}
      </HelperText>
      <Br />
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}>
        Crear cuenta
      </Button>
      <Br />
      <Button
        mode="text"
        onPress={() => {
          navigation.replace('Login');
        }}>
        Login
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
