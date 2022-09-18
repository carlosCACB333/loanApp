import React, {createContext, useEffect, useReducer} from 'react';
import {IUser} from '../interfaces';
import {AuthReducer} from './AuthReducer';
import {Loading} from '../components/Loading';
import {useCheckTokenQuery} from '../app/services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProps {
  user?: IUser;
  checking: boolean;
  setLogin: (user: IUser, token: string) => void;
  setLogout: () => void;
}

export interface AuthState {
  user?: IUser;
  checking: boolean;
}

export const Auth_INITIAL_STATE: AuthState = {
  checking: true,
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

interface Props {
  children: (isAuth: boolean) => React.ReactNode;
}

export const AuthProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(AuthReducer, Auth_INITIAL_STATE);

  const {data, isError} = useCheckTokenQuery(undefined, {
    refetchOnFocus: true,
  });

  useEffect(() => {
    if (!data) return;
    setLogin(data.user, data.token);
  }, [data]);

  useEffect(() => {
    if (!isError) return;
    toggleChecking(false);
  }, [isError]);

  const setLogin = (user: IUser, token: string) => {
    AsyncStorage.setItem('token', token);
    dispatch({type: 'setLogin', payload: user});
  };

  const setLogout = () => {
    AsyncStorage.removeItem('token');
    dispatch({type: 'logout'});
  };

  const toggleChecking = (checking: boolean) => {
    dispatch({type: 'toggleChecking', payload: checking});
  };

  if (state.checking) {
    return (
      <Loading text="Espere un momento, estamos trabajando es su sesión..." />
    );
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setLogin,
        setLogout,
      }}>
      {children(state.user ? true : false)}
    </AuthContext.Provider>
  );
};
