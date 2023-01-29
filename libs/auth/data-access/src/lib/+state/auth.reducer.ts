import { Error } from '@mono/common/shared';
import { User } from '@mono/user/shared';
import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface State {
  authenticated?: boolean; // if user is authenticated
  authenticating: boolean; // if authentication is in progress
  jwt?: string;
  user?: User;
  error?: Error | null; // last known error (if any)
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const initialState: State = {
  authenticating: false,
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({ ...state, authenticating: true })),
  on(AuthActions.loginSuccess, (state, { jwt }) => ({
    ...state,
    authenticated: true,
    authenticating: false,
    jwt,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, authenticating: false, error })),
  on(AuthActions.info, (state, { jwt }) => ({ ...state, jwt })),
  on(AuthActions.infoSuccess, (state, { user }) => ({ ...state, authenticated: true, user, error: null })),
  on(AuthActions.infoFailure, (state, { error }) => ({ ...state, authenticated: false, error })),
  on(AuthActions.revokeAuthentication, (state) => ({ ...state, authenticated: false }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
