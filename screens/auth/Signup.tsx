import {Text, Button, TextInput, HelperText} from 'react-native-paper';
import React, {useContext} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {authStackParams} from '../../navigations/AuthStack';
import {AuthLayout} from '../../layouts';
import {Br} from '../../components';
import {Alert, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {AuthContext} from '../../context/AuthContext';
import {globals} from '../../styles';
import {useSignupMutation} from '../../app/services/auth';

type Props = NativeStackScreenProps<authStackParams, 'Signup'>;

export interface ISignup {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
export const Signup = ({navigation}: Props) => {
  const {setLogin} = useContext(AuthContext);
  const [signupStart, {isLoading}] = useSignupMutation();
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors, isValid},
  } = useForm<ISignup>({mode: 'onChange'});

  const onSubmit = (data: ISignup) => {
    signupStart(data)
      .unwrap()
      .then(({token, user}) => {
        setLogin(user, token);
      })
      .catch(err => {
        const e = err?.data;

        if (e?.fields) {
          const {email, password, passwordConfirmation, firstName, lastName} =
            e.fields;

          email && setError('email', {message: email});
          password && setError('password', {message: password});
          passwordConfirmation &&
            setError('passwordConfirmation', {message: passwordConfirmation});
          firstName && setError('firstName', {message: firstName});
          lastName && setError('lastName', {message: lastName});
        } else {
          Alert.alert('Error', e.message || 'Error al registrarse');
        }
      });
  };

  return (
    <AuthLayout>
      <View>
        <Text style={[globals.title, globals.bold]}>Bienvenido !</Text>
        <Br size={4} />
        <Text>
          Registrate para continuar con tu experiencia en nuestra app.
        </Text>
      </View>
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
        style={globals.btn}
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid || isLoading}>
        Crear cuenta
      </Button>
      <Br />
      <Button
        mode="text"
        style={globals.btn}
        onPress={() => {
          navigation.replace('Login');
        }}>
        Ya tengo una cuenta !
      </Button>
    </AuthLayout>
  );
};
