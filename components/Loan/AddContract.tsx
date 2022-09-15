import * as React from 'react';
import {
  Text,
  TextInput,
  HelperText,
  Button,
  useTheme,
} from 'react-native-paper';
import {globals} from '../../styles';
import {Alert, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Br} from '../Br';
import {Picker} from '@react-native-picker/picker';

import {Modal} from '../../layouts';
import {IContract, IUser} from '../../interfaces';
import {AuthContext} from '../../context/AuthContext';
import {ax} from '../../utils/ax';
import {useAppDispatch} from '../../app/hooks';
import {addContract} from '../../app/loanSlice';
import {useAddContractMutation} from '../../app/services';
interface Props {}
export const AddContract = ({}: Props) => {
  const theme = useTheme();
  const {user} = React.useContext(AuthContext);
  const [users, setUsers] = React.useState<IUser[]>([]);
  const dispatch = useAppDispatch();
  const [addContractStart, {isLoading}] = useAddContractMutation();
  React.useEffect(() => {
    ax.get<IUser[]>('/user')
      .then(res => {
        setUsers(res.data.filter(u => u._id !== user?._id));
      })
      .catch(console.log);
  }, [user?._id]);

  const {
    control,
    handleSubmit,
    setError,
    formState: {errors, isValid},
  } = useForm<IContract>({
    mode: 'onChange',
    defaultValues: {},
  });

  const selectStyle = {
    borderColor: errors.borrower ? theme.colors.tertiary : theme.colors.outline,
    borderWidth: 1,
  };

  const onSubmit = async (d: IContract) => {
    return addContractStart(d)
      .unwrap()
      .then(data => {
        dispatch(addContract(data));
        return true;
      })
      .catch(error => {
        const e = (error as any).data;
        if (e?.fields) {
          const {borrower, operations, name} = e.fields as any;
          const op = operations as IContract['operations'][0];
          borrower && setError('borrower', {message: borrower + ''});
          name && setError('name', {message: name + ''});
          op?.amount &&
            setError('operations.0.amount', {message: op.amount + ''});
          op?.description &&
            setError('operations.0.description', {
              message: op.description + '',
            });
        } else {
          Alert.alert('Error', e?.message || 'Ocurrió un error');
        }
        return false;
      });
  };

  return (
    <Modal
      footer={onClose => (
        <>
          <Button onPress={onClose}>Cancelar</Button>
          <Button
            onPress={handleSubmit(async data => {
              const ok = await onSubmit(data);
              ok && onClose();
            })}
            mode="contained"
            disabled={!isValid || isLoading}>
            Añadir
          </Button>
        </>
      )}>
      <Text style={globals.title}>Registrar un nuevo préstamo</Text>
      <Br />
      <Br />
      <Controller
        control={control}
        name="name"
        rules={{
          required: 'El nombre es requerido',
          min: {
            value: 1,
            message: 'El monto debe ser mayor a 0',
          },
        }}
        render={({field: {onChange, value, onBlur}}) => (
          <TextInput
            value={value}
            label="Nombre del préstamo"
            onBlur={onBlur}
            mode="outlined"
            onChangeText={onChange}
            error={!!errors.name}
          />
        )}
      />
      <HelperText type="error">{errors?.name?.message}</HelperText>
      <Br />
      <Controller
        control={control}
        name="borrower"
        rules={{
          required: 'El prestamista es requerido',
        }}
        render={({field: {onChange, value}}) => (
          <View style={selectStyle}>
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={{
                color: errors.borrower
                  ? theme.colors.tertiary
                  : theme.colors.text,
              }}>
              <Picker.Item label="Seleccione un usuario..." value="" />
              {users.map(u => (
                <Picker.Item
                  key={u._id}
                  label={u.firstName + ' ' + u.lastName}
                  value={u._id}
                />
              ))}
            </Picker>
          </View>
        )}
      />
      <HelperText type="error">{errors?.borrower?.message}</HelperText>
      <Br />
      <Controller
        control={control}
        name="operations.0.amount"
        rules={{
          required: 'El monto es requerido',
          min: {
            value: 1,
            message: 'El monto debe ser mayor a 0',
          },
        }}
        render={({field: {onChange, value, onBlur}}) => (
          <TextInput
            value={value ? value + '' : ''}
            label="Cantidad"
            onBlur={onBlur}
            mode="outlined"
            onChangeText={onChange}
            error={!!errors.operations?.[0]?.amount}
            keyboardType="numeric"
          />
        )}
      />
      <HelperText type="error">
        {errors?.operations?.[0]?.amount?.message}
      </HelperText>
      <Br />
      <Controller
        control={control}
        name="operations.0.description"
        rules={{
          required: 'La descripción es requerida',
        }}
        render={({field: {onChange, value, onBlur}}) => (
          <TextInput
            value={value ? value + '' : ''}
            label="Descripción del préstamo"
            onBlur={onBlur}
            mode="outlined"
            onChangeText={onChange}
            error={!!errors.operations?.[0]?.description}
          />
        )}
      />
      <HelperText type="error">
        {errors?.operations?.[0]?.description?.message}
      </HelperText>
      <Br />
    </Modal>
  );
};
