import {Alert, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {Button, HelperText, TextInput} from 'react-native-paper';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {authStackParams} from '../../navigations/AuthStack';
import {AuthLayout} from '../../layouts';
import {Br} from '../../components';
import {useForm, Controller} from 'react-hook-form';
import {IFieldError} from '../../interfaces';
import {AuthContext} from '../../context/AuthContext';
import {globals} from '../../styles';
import {useLoginMutation} from '../../app/services/auth';

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

  const [loginStart, {data, error, isLoading}] = useLoginMutation();

  useEffect(() => {
    console.log(error);

    const e = (error as any)?.data;
    if (!e) return;
    const {fields, message} = e as {fields?: IFieldError; message?: string};

    if (!fields) {
      return Alert.alert('Error', message || 'Error al iniciar sesión');
    }

    const {email, password} = fields;
    email && setError('email', {message: email});
    password && setError('password', {message: password});
  }, [error]);

  useEffect(() => {
    if (!data) return;
    const {token, user} = data;
    setLogin(user, token);
  }, [data]);

  return (
    <AuthLayout>
      <View>
        <Text style={[globals.title, globals.bold]}>Bienvenido !</Text>
        <Br size={4} />
        <Text>
          Inicia sesión para continuar con tu experiencia en nuestra app.
        </Text>
      </View>
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
      <HelperText type="error">{errors?.email?.message || ''}</HelperText>

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
        style={globals.btn}
        mode="contained"
        onPress={handleSubmit(loginStart)}
        disabled={!isValid || isLoading}>
        Iniciar sesión
      </Button>
      <Br />
      <Button
        mode="text"
        style={globals.btn}
        onPress={() => navigation.replace('Signup')}>
        ¿No tienes cuenta? Registrate
      </Button>
    </AuthLayout>
  );
};
