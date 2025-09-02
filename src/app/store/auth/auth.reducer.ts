import { createReducer, on } from '@ngrx/store';
import { User } from '../../core/models';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false
};

export const authReducer = createReducer(
  initialState,
  
  on(AuthActions.login, AuthActions.register, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(AuthActions.loginSuccess, AuthActions.registerSuccess, (state, { response }) => ({
    ...state,
    user: {
      username: response.username,
      roles: response.roles,
      token: response.access_token
    },
    isLoading: false,
    error: null,
    isAuthenticated: true
  })),
  
  on(AuthActions.loginFailure, AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
    isAuthenticated: false
  })),
  
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
    isAuthenticated: false,
    error: null
  })),
  
  on(AuthActions.loadUserFromStorage, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true
  })),
  
  on(AuthActions.clearError, (state) => ({
    ...state,
    error: null
  }))
);
