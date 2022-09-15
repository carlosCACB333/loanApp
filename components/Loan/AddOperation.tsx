import * as React from 'react';
import {
  Text,
  useTheme,
  TextInput,
  HelperText,
  Button,
} from 'react-native-paper';
import {globals} from '../../styles';
import {View, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {IOperation} from '../../interfaces';
import {Br} from '../Br';
import {Picker} from '@react-native-picker/picker';
import {Modal} from '../../layouts';
import {useAppDispatch} from '../../app/hooks';
import {addOperation} from '../../app/loanSlice';
import {useAddOperationMutation} from '../../app/services';
interface Props {
  id: string;
}
export const AddOperation = ({id}: Props) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [addOperationsStart, {isLoading}] = useAddOperationMutation();

  const {
    control,
    handleSubmit,
    setError,
    formState: {errors, isValid},
  } = useForm<IOperation>({
    mode: 'onChange',
  });

  const selectStyle = {
    borderColor: errors.type ? theme.colors.tertiary : theme.colors.outline,
    borderWidth: 1,
  };

  const onSubmit = async (op: IOperation) => {
    return addOperationsStart({
      id,
      op: op,
    })
      .unwrap()
      .then(data => {
        dispatch(addOperation({id, op: data}));
        return true;
      })
      .catch(error => {
        const e = (error as any)?.data;
        if (e?.fields) {
          const {amount, type, description} = e.fields as IOperation;
          amount && setError('amount', {message: amount + ''});
          type && setError('type', {message: type + ''});
          description && setError('description', {message: description + ''});
        } else {
          Alert.alert('Error', e?.message || ' Ocurrion un error');
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
      <Text style={globals.title}>Agregar nueva operación</Text>
      <Br />
      <Br />
      <Controller
        control={control}
        name="amount"
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
            label="Monto"
            onBlur={onBlur}
            mode="outlined"
            onChangeText={onChange}
            error={!!errors.amount}
            keyboardType="numeric"
          />
        )}
      />
      <HelperText type="error">{errors?.amount?.message}</HelperText>
      <Br />
      <Controller
        control={control}
        name="type"
        rules={{
          required: 'El tipo es requerido',
        }}
        render={({field: {onChange, value}}) => (
          <View style={selectStyle}>
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={{
                color: errors.type ? theme.colors.tertiary : theme.colors.text,
              }}>
              <Picker.Item label="Tipo de operación..." value="" />
              <Picker.Item label="Préstamo" value="loan" />
              <Picker.Item label="Pago" value="payment" />
            </Picker>
          </View>
        )}
      />
      <HelperText type="error">{errors?.type?.message}</HelperText>
      <Br />
      <Controller
        control={control}
        name="description"
        rules={{
          required: 'La descripción es requerida',
        }}
        render={({field: {onChange, value, onBlur}}) => (
          <TextInput
            value={value}
            label="Descripción"
            onBlur={onBlur}
            mode="outlined"
            onChangeText={onChange}
            error={!!errors.description}
          />
        )}
      />
      <HelperText type="error">{errors?.description?.message}</HelperText>
      <Br />
    </Modal>
  );
};
