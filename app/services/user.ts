import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {consts} from '../../consts';
import {IUser} from '../../interfaces';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: consts.apiUrl + '/users',
    prepareHeaders: async headers => {
      headers.set(
        'Authorization',
        `Bearer ${await AsyncStorage.getItem('token')}`,
      );
      return headers;
    },
  }),
  endpoints: builder => ({
    getUser: builder.query<IUser[], void>({
      query: () => '',
    }),

    search: builder.mutation<IUser[], string>({
      query: (search: string) => ({
        url: '/search',
        method: 'POST',
        body: {search},
      }),
    }),
  }),
});

export const {useGetUserQuery, useSearchMutation} = userApi;
