import {Button, TextInput, HelperText} from 'react-native-paper';
import React, {useContext} from 'react';
import {AuthLayout} from '../../layouts';
import {Br} from '../../components';
import {Alert, ToastAndroid} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {AuthContext} from '../../context/AuthContext';
import {ProfileScreenProps} from '../../navigations/ProfileStack';
import {useUpdateProfileMutation} from '../../app/services/auth';

interface IUpdateProfile {
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
}
export const UpdateProfile = ({
  navigation,
}: ProfileScreenProps<'UpdateProfile'>) => {
  const {setUser, user} = useContext(AuthContext);
  const [updateProfile, {isLoading}] = useUpdateProfileMutation();
  const {
    handleSubmit,
    control,
    setError,
    formState: {errors, isValid},
  } = useForm<IUpdateProfile>({
    mode: 'onChange',
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      photo: user?.photo,
    },
  });

  const onSubmit = (data: IUpdateProfile) => {
    updateProfile(data)
      .unwrap()
      .then(u => {
        setUser(u);
        ToastAndroid.show(
          'Datos actualizados correctamente',
          ToastAndroid.LONG,
        );
        navigation.goBack();
      })
      .catch(err => {
        const e = (err as any)?.data;
        if (e?.fields) {
          const {email, firstName, lastName, photo} =
            e.fields as IUpdateProfile;
          email && setError('email', {message: email});
          firstName && setError('firstName', {message: firstName});
          lastName && setError('lastName', {message: lastName});
          photo && setError('photo', {message: photo});
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
        name="firstName"
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
        name="photo"
        render={({field: {onChange, value, onBlur}}) => (
          <TextInput
            value={value}
            label="Foto"
            mode="outlined"
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="url"
            error={!!errors.photo}
          />
        )}
      />
      <HelperText type="error">{errors?.photo?.message}</HelperText>

      <Br />
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid || isLoading}>
        Actualizar datos
      </Button>
      <Br />
    </AuthLayout>
  );
};
