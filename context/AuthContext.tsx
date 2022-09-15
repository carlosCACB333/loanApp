import React, {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useReducer,
} from 'react';
import {IUser} from '../interfaces';

import {ax} from '../utils/ax';
import {AuthReducer} from './AuthReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Loading} from '../components/Loading';

interface AuthContextProps {
  user?: IUser;
  token?: string;
  checking: boolean;
  setLogin: (user: IUser, token: string) => void;
  setLogout: () => void;
  setChecking: () => void;
  deleteChecking: () => void;
  setUser: (user: IUser) => void;
}

export interface AuthState {
  user?: IUser;
  token?: string;
  checking: boolean;
}

export const Auth_INITIAL_STATE: AuthState = {
  checking: true,
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

export const AuthProvider: FC<PropsWithChildren> = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, Auth_INITIAL_STATE);

  useEffect(() => {
    const verifyToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        ax.defaults.headers.common.Authorization = `Bearer ${token}`;

        try {
          const {data} = await ax.get<{token: string; user: IUser}>(
            '/auth/check',
          );
          const user = data.user;
          dispatch({type: 'setLogin', payload: {user, token}});
        } catch (error) {
          console.log(error);
          dispatch({type: 'deleteCheking'});
        }
      } else {
        dispatch({type: 'deleteCheking'});
      }
    };

    verifyToken();
  }, []);

  const setChecking = () => {
    dispatch({type: 'setCheking'});
  };

  const deleteChecking = () => {
    dispatch({type: 'deleteCheking'});
  };

  const setLogin = (user: IUser, token: string) => {
    dispatch({type: 'setLogin', payload: {user, token}});
  };

  const setLogout = () => {
    dispatch({type: 'logout'});
  };

  const setUser = (user: IUser) => {
    dispatch({type: 'setUser', payload: user});
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
        setChecking,
        deleteChecking,
        setLogin,
        setLogout,
        setUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
