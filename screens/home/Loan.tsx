import {FlatList} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {Br} from '../../components';
import {HomeLayout} from '../../layouts';
import {AddContract, CardContract, PieLoan} from '../../components/Loan';
import {useGetContractsQuery} from '../../app/services';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {setContracts} from '../../app/loanSlice';
import {Loading} from '../../components/Loading';
import {AuthContext} from '../../context/AuthContext';
import {IUser} from '../../interfaces';
import {Text, useTheme} from 'react-native-paper';
import {globals} from '../../styles';

export const Loan = () => {
  const {data, isLoading, refetch} = useGetContractsQuery();
  const {contracts} = useAppSelector(state => state.loan);
  const dispatch = useAppDispatch();
  const {user} = useContext(AuthContext);
  const {colors} = useTheme();

  useEffect(() => {
    if (!data) {
      return;
    }
    dispatch(setContracts(data));
  }, [data, dispatch]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <HomeLayout>
        <PieLoan />
        <Br />
        <FlatList
          data={contracts}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          refreshing={isLoading}
          onRefresh={refetch}
          ItemSeparatorComponent={() => <Br />}
          renderItem={({item}) => (
            <CardContract
              contract={item}
              isLender={user?._id === (item.lender as IUser)._id}
            />
          )}
          ListEmptyComponent={() => (
            <Text
              style={{
                ...globals.center,
                ...globals.subTitle,
                color: colors.disabled,
              }}>
              Aún no tienes ninguna transacción
            </Text>
          )}
        />
      </HomeLayout>
      <AddContract />
    </>
  );
};
