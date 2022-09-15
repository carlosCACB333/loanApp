import React, {useState} from 'react';
import {LoanScreenProps} from '../../navigations/LoanStack';
import {
  Badge,
  Button,
  DataTable,
  HelperText,
  Menu,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {ScrollView, View, Alert} from 'react-native';
import {Br} from '../../components';

import {AddOperation} from '../../components/Loan';

import {CardContract} from '../../components/Loan/';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {Modal} from '../../layouts';
import {globals} from '../../styles';
import {
  useDeleteContractMutation,
  useDeleteOperationMutation,
  useInactivateContractMutation,
  useUpdateNameContractMutation,
} from '../../app/services';
import {
  deleteContract,
  deleteOperation,
  updateContract,
  updateNameContract,
} from '../../app/loanSlice';
import {dateFormat} from '../../utils/dateFormat';
import {IOperation} from '../../interfaces/contract';

export const LoanDetail = ({route, navigation}: LoanScreenProps<'Detail'>) => {
  const {id, isLender} = route.params;

  const {contracts} = useAppSelector(state => state.loan);
  const contract = contracts.find(item => item._id === id);
  const [contractSelect, setContractSelect] = useState<
    IOperation | undefined
  >();
  const [deleteContractStart, {isLoading}] = useDeleteContractMutation();
  const [inactivateStart, {isLoading: isLo2}] = useInactivateContractMutation();
  const [deleteOpStart, {isLoading: isLo3}] = useDeleteOperationMutation();
  const [updateContractStart, {isLoading: isLo4}] =
    useUpdateNameContractMutation();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const [editFiel, setEditFiel] = useState({
    name: contract?.name || '',
    error: '',
  });

  if (!contract) {
    return null;
  }

  const handleDelete = () => {
    deleteContractStart(id)
      .unwrap()
      .then(uid => {
        dispatch(deleteContract(uid));
        navigation.goBack();
      })
      .catch(err => {
        Alert.alert('Error', err?.data?.message || 'Ocurrió un error');
      });
  };
  const handleClose = () => {
    return inactivateStart(id)
      .unwrap()
      .then(c => {
        dispatch(updateContract(c));
        return true;
      })
      .catch(err => {
        Alert.alert('Error', err?.data?.message || 'Ocurrió un error');
        return false;
      });
  };

  const handleDeleteOption = (opId: string) => {
    deleteOpStart({id, opId})
      .unwrap()
      .then(idCont => {
        dispatch(deleteOperation({id: idCont, opId}));
      })
      .catch(err => {
        Alert.alert('Error', err?.data?.message || 'Ocurrió un error');
      });
  };

  const handleEditName = () => {
    if (editFiel.name.length < 3) {
      setEditFiel({
        ...editFiel,
        error: 'El nombre debe tener al menos 3 caracteres',
      });
      return false;
    }

    return updateContractStart({id, name: editFiel.name})
      .unwrap()
      .then(c => {
        dispatch(
          updateNameContract({
            contract: c,
          }),
        );
        setEditFiel({
          ...editFiel,
          error: '',
        });
        return true;
      })
      .catch(err => {
        setEditFiel({
          ...editFiel,
          error: err?.data?.message || 'Ocurrió un error',
        });
        return false;
      });
  };

  return (
    <>
      <Br />
      <CardContract contract={contract} isLender={isLender} />

      <Br />
      {isLender && (
        <View style={{...globals.row, ...globals.sbw}}>
          <Modal
            button={onOpen => (
              <Button onPress={onOpen}>
                <Text style={{color: theme.colors.primary}}>
                  Editar préstamo
                </Text>
              </Button>
            )}
            footer={onClose => (
              <>
                <Button onPress={onClose}>Cancelar</Button>
                <Button
                  onPress={async () => {
                    const res = await handleEditName();
                    if (res) {
                      onClose();
                    }
                  }}
                  mode="contained"
                  disabled={isLo4}>
                  Editar
                </Button>
              </>
            )}>
            <Text style={globals.subTitle}>Editar préstamo</Text>
            <Br />
            <TextInput
              value={editFiel.name}
              label="Nombre del préstamo"
              mode="outlined"
              onChangeText={val => setEditFiel({...editFiel, name: val})}
              error={!!editFiel.error}
            />
            <HelperText type="error">{editFiel.error}</HelperText>
          </Modal>
          <Modal
            button={onOpen => (
              <Button onPress={onOpen}>
                <Text style={{color: theme.colors.error}}>
                  Eliminar préstamo
                </Text>
              </Button>
            )}
            footer={onClose => (
              <>
                <Button onPress={onClose}>Cancelar</Button>
                <Button
                  onPress={handleDelete}
                  mode="contained"
                  disabled={isLoading}>
                  Eliminar
                </Button>
              </>
            )}>
            <Text style={globals.subTitle}>
              ¿ Está seguro que desea eliminar este préstamo ?
            </Text>
            <Text>Esta acción no se puede deshacer</Text>
          </Modal>
          <Modal
            button={onOpen => (
              <Button
                onPress={onOpen}
                disabled={contract.status === 'inactive'}>
                <Text style={{color: theme.colors.tertiary}}>
                  Cerrar préstamo
                </Text>
              </Button>
            )}
            footer={onClose => (
              <>
                <Button onPress={onClose}>Cancelar</Button>
                <Button
                  onPress={async () => {
                    const res = await handleClose();
                    if (res) {
                      onClose();
                    }
                  }}
                  mode="contained"
                  disabled={isLo2}>
                  Cerrar
                </Button>
              </>
            )}>
            <Text style={globals.subTitle}>
              ¿ Está seguro que desea cerrar el préstamo ?
            </Text>
            <Text>
              Al cerrar el préstamo no se podrá realizar más operaciones.
            </Text>
          </Modal>
        </View>
      )}
      <Br />
      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={globals.flex4}>Fecha</DataTable.Title>
            <DataTable.Title numeric>Monto</DataTable.Title>
            <DataTable.Title numeric>Accion</DataTable.Title>
            {contract.status === 'active' && isLender && (
              <DataTable.Title numeric>{''}</DataTable.Title>
            )}
          </DataTable.Header>

          {contract.operations.map(item => (
            <DataTable.Row key={item._id} style={{}}>
              <DataTable.Cell style={globals.flex4}>
                <Menu
                  visible={contractSelect?._id === item._id}
                  style={{
                    transform: [{translateY: 10}],
                  }}
                  anchor={
                    <Text onPress={() => setContractSelect(item)}>
                      {dateFormat(item.createdAt)}
                    </Text>
                  }
                  onDismiss={() => setContractSelect(undefined)}>
                  <View style={globals.tooltip}>
                    <Text>{item.description}</Text>
                  </View>
                </Menu>
              </DataTable.Cell>
              <DataTable.Cell numeric>s/ {item.amount}</DataTable.Cell>
              <DataTable.Cell numeric>
                <View>
                  <Badge
                    style={{
                      backgroundColor:
                        item.type === 'loan'
                          ? theme.colors.primary
                          : theme.colors.error,
                    }}>
                    {item.type === 'loan' ? 'Préstamo' : 'Pago'}
                  </Badge>
                </View>
              </DataTable.Cell>
              {contract.status === 'active' && isLender && (
                <DataTable.Cell numeric style={globals.scroll}>
                  <View>
                    <Modal
                      button={onOpen => (
                        <Button icon="close" onPress={onOpen} style={{}}>
                          {''}
                        </Button>
                      )}
                      footer={onClose => (
                        <>
                          <Button onPress={onClose}>Cancelar</Button>
                          <Button
                            onPress={() => handleDeleteOption(item._id)}
                            mode="contained"
                            disabled={isLo3}>
                            Eliminar
                          </Button>
                        </>
                      )}>
                      <Text style={globals.subTitle}>
                        ¿ Está seguro que desea eliminar esta operación ?
                      </Text>
                      <Text>Esta acción no se puede deshacer</Text>
                    </Modal>
                  </View>
                </DataTable.Cell>
              )}
            </DataTable.Row>
          ))}
        </DataTable>
        <Br />
      </ScrollView>
      {isLender && contract.status !== 'inactive' && (
        <AddOperation id={contract._id} />
      )}
    </>
  );
};
