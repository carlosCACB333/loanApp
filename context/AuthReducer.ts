import {IUser} from '../interfaces';
import {AuthState} from './AuthContext';

type AuthAction =
  | {type: 'setCheking'}
  | {type: 'deleteCheking'}
  | {type: 'setLogin'; payload: {token: string; user: IUser}}
  | {type: 'logout'}
  | {type: 'setUser'; payload: IUser};

export const AuthReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'setCheking':
      return {...state, checking: true};
    case 'deleteCheking':
      return {...state, checking: false};

    case 'setLogin':
      return {
        ...state,
        checking: false,
        token: action.payload.token,
        user: action.payload.user,
      };

    case 'logout':
      return {
        ...state,
        checking: false,
        token: undefined,
        user: undefined,
      };
    case 'setUser':
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
