import {IUser} from '../interfaces';
import {AuthState} from './AuthContext';

type AuthAction =
  | {type: 'toggleChecking'; payload: boolean}
  | {type: 'setLogin'; payload: IUser}
  | {type: 'logout'};

export const AuthReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'toggleChecking':
      return {
        ...state,
        checking: action.payload,
      };

    case 'setLogin':
      return {
        ...state,
        checking: false,
        user: action.payload,
      };

    case 'logout':
      return {
        ...state,
        checking: false,
        user: undefined,
      };

    default:
      return state;
  }
};
