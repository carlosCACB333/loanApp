import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {consts} from '../../consts';
import {IContract, IOperation} from '../../interfaces';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export const contractApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: consts.apiUrl + '/contract',
    prepareHeaders: async headers => {
      headers.set('api_key', 'uAG5L.T5zpxN7Qg');
      headers.set(
        'Authorization',
        `Bearer ${await AsyncStorage.getItem('token')}`,
      );
      return headers;
    },
  }),

  endpoints: builder => ({
    getContracts: builder.query<IContract[], void>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
    }),

    addContract: builder.mutation<IContract, IContract>({
      query: body => ({
        url: '/',
        method: 'POST',
        body,
      }),
    }),

    addOperation: builder.mutation<IOperation, {op: IOperation; id: string}>({
      query: req => ({
        url: '/' + req.id + '/operations',
        method: 'POST',
        body: req.op,
      }),
    }),

    deleteContract: builder.mutation<string, string>({
      query: id => ({
        url: '/' + id,
        method: 'DELETE',
      }),
    }),

    inactivateContract: builder.mutation<IContract, string>({
      query: id => ({
        url: '/' + id + '/inactivate',
        method: 'PUT',
      }),
    }),

    deleteOperation: builder.mutation<string, {id: string; opId: string}>({
      query: req => ({
        url: '/' + req.id + '/operations/' + req.opId,
        method: 'DELETE',
      }),
    }),

    updateNameContract: builder.mutation<IContract, {id: string; name: string}>(
      {
        query: req => ({
          url: '/' + req.id + '/name',
          method: 'PATCH',
          body: {name: req.name},
        }),
      },
    ),
  }),
});

export const {
  useGetContractsQuery,
  useAddContractMutation,
  useAddOperationMutation,
  useDeleteContractMutation,
  useInactivateContractMutation,
  useDeleteOperationMutation,
  useUpdateNameContractMutation,
} = contractApi;
