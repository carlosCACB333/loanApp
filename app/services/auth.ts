import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {consts} from '../../consts';
import {IUser} from '../../interfaces';
import {IChangePw} from '../../screens/auth';

export const authApi = createApi({
  reducerPath: 'authApiReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: consts.apiUrl + '/auth',
    prepareHeaders: async headers => {
      headers.set(
        'Authorization',
        `Bearer ${await AsyncStorage.getItem('token')}`,
      );
      return headers;
    },
  }),
  endpoints: builder => ({
    updateProfile: builder.mutation<IUser, Partial<IUser>>({
      query: data => ({
        url: '/update-profile',
        method: 'PUT',
        body: data,
      }),
    }),

    ChangePassword: builder.mutation<{user: IUser; token: string}, IChangePw>({
      query: data => ({
        url: '/change-password',
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {useUpdateProfileMutation, useChangePasswordMutation} = authApi;
