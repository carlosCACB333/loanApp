import {Button, TextInput, HelperText} from 'react-native-paper';
import React, {useContext} from 'react';
import {AuthLayout} from '../../layouts';
import {Br} from '../../components';
import {Alert, ToastAndroid} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {AuthContext} from '../../context/AuthContext';
import {ProfileScreenProps} from '../../navigations/ProfileStack';
import {useChangePasswordMutation} from '../../app/services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {globals} from '../../styles/globals';

export interface IChangePw {
  oldPassword: string;
  newPassword: string;
  passwordConfirmation: string;
}
export const ChangePassword = ({
  navigation,
}: ProfileScreenProps<'ChangePassword'>) => {
  const {setLogin} = useContext(AuthContext);
  const [changePassStart, {isLoading}] = useChangePasswordMutation();
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors, isValid},
  } = useForm<IChangePw>({mode: 'onChange'});

  const onSubmit = (data: IChangePw) => {
    changePassStart(data)
      .unwrap()
      .then(({user, token}) => {
        setLogin(user, token);
        AsyncStorage.setItem('token', token);
        ToastAndroid.show(
          'Contraseña actualizada correctamente',
          ToastAndroid.LONG,
        );
        navigation.goBack();
      })
      .catch(err => {
        const e = (err as any)?.data;
        if (e?.fields) {
          const {newPassword, oldPassword, passwordConfirmation} =
            e.fields as IChangePw;
          newPassword && setError('newPassword', {message: newPassword});
          oldPassword && setError('oldPassword', {message: oldPassword});
          passwordConfirmation &&
            setError('passwordConfirmation', {message: passwordConfirmation});
        } else {
          Alert.alert('Error', e?.message || ' Ocurrion un error');
        }
      });
  };

  return (
    <AuthLayout>
      <Br />

      <Controller
        control={control}
        name="oldPassword"
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
            label="Contraseña antigua"
            mode="outlined"
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry
            error={!!errors.oldPassword}
          />
        )}
      />
      <HelperText type="error">{errors?.oldPassword?.message}</HelperText>

      <Controller
        control={control}
        name="newPassword"
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
            label="Contraseña nueva"
            mode="outlined"
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry
            error={!!errors.newPassword}
          />
        )}
      />
      <HelperText type="error">{errors?.newPassword?.message}</HelperText>

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
        Actualizar contraseña
      </Button>
      <Br />
    </AuthLayout>
  );
};
