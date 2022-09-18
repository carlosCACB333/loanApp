import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {consts} from '../../consts';
import {IUser} from '../../interfaces';
import {IChangePw} from '../../screens/auth';
import {ISignup} from '../../screens/auth/Signup';

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
    login: builder.mutation<
      {user: IUser; token: string},
      {email: string; password: string}
    >({
      query: body => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),

    signup: builder.mutation<{user: IUser; token: string}, ISignup>({
      query: body => ({
        url: '/signup',
        method: 'POST',
        body,
      }),
    }),

    checkToken: builder.query<{user: IUser; token: string}, void>({
      query: () => ({
        url: '/check',
        method: 'GET',
      }),
    }),

    updateProfile: builder.mutation<
      {user: IUser; token: string},
      Partial<IUser>
    >({
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

export const {
  useCheckTokenQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useLoginMutation,
  useSignupMutation,
} = authApi;
