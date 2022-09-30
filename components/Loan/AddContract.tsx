import * as React from 'react';
import {
  Text,
  TextInput,
  HelperText,
  Button,
  useTheme,
} from 'react-native-paper';
import {globals} from '../../styles';
import {Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Br} from '../Br';

import {Modal} from '../../layouts';
import {IContract, IUser} from '../../interfaces';
import {AuthContext} from '../../context/AuthContext';

import {useAppDispatch} from '../../app/hooks';
import {addContract} from '../../app/loanSlice';
import {useAddContractMutation, useSearchMutation} from '../../app/services';
import {SearchUser} from './SearchUser';
import {useDebounce} from '../../hooks';

interface Props {}
export const AddContract = ({}: Props) => {
  const {colors} = useTheme();
  const {user} = React.useContext(AuthContext);
  const [selectedUser, setSelectedUser] = React.useState<IUser | undefined>();
  const dispatch = useAppDispatch();
  const [addContractStart, {isLoading}] = useAddContractMutation();
  const [search, setSearch] = React.useState('');
  const {debounce} = useDebounce(search);
  const [onSearch, {data: searchUsers, isLoading: refreshing}] =
    useSearchMutation();

  React.useEffect(() => {
    onSearch(debounce);
  }, [debounce]);

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    resetField,
    clearErrors,

    formState: {errors, isValid},
  } = useForm<IContract>({
    mode: 'onChange',
    defaultValues: {},
  });

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
          <Button style={globals.btn} onPress={onClose}>
            Cancelar
          </Button>
          <Button
            onPress={handleSubmit(async data => {
              const ok = await onSubmit(data);
              ok && onClose();
            })}
            style={globals.btn}
            mode="contained"
            disabled={!isValid || isLoading}>
            Añadir
          </Button>
        </>
      )}>
      <Text style={globals.title}>Registrar un nuevo préstamo</Text>
      <Br size={2} />
      <Text style={globals.label}>
        Registra el préstamo que le hiciste a un contacto para que puedas llevar
        un control de los pagos que te debe.
      </Text>
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
            multiline
          />
        )}
      />
      <HelperText type="error">
        {errors?.operations?.[0]?.description?.message}
      </HelperText>

      <Modal
        button={onPress => (
          <Button
            onPress={() => {
              onPress();
            }}
            style={globals.btn}
            mode="outlined">
            Selecconar un contacto
          </Button>
        )}
        footer={onClose => {
          return (
            <>
              <Button
                style={globals.btn}
                onPress={() => {
                  setValue('borrower', '');
                  resetField('borrower');
                  setSelectedUser(undefined);
                  onClose();
                }}>
                Cancelar
              </Button>
              <Button
                style={globals.btn}
                mode="contained"
                onPress={onClose}
                disabled={!selectedUser}>
                Seleccionar
              </Button>
            </>
          );
        }}>
        <SearchUser
          selectedUser={selectedUser}
          refreshing={refreshing}
          setSearch={value => setSearch(value)}
          users={searchUsers?.filter(u => u._id !== user?._id) || []}
          setBorrower={borrower => {
            clearErrors('borrower');
            setValue('borrower', borrower._id, {shouldValidate: true});
            setSelectedUser(borrower);
          }}
        />
      </Modal>
      <HelperText type={errors.borrower ? 'error' : 'info'}>
        {errors?.borrower?.message ||
          (selectedUser?.firstName || '') +
            ' ' +
            (selectedUser?.lastName || '')}
      </HelperText>
    </Modal>
  );
};
