import { Error } from '@mono/common/shared';
import { User } from '@mono/user/shared';
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string; redirectTo: string | null }>()
);
export const loginSuccess = createAction('[Auth] Login Success', props<{ jwt: string; redirectTo: string | null }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: Error }>());

export const checkAuthentication = createAction('[Auth] Check Authentication');
export const revokeAuthentication = createAction('[Auth] Revoke Authentication');

export const info = createAction('[Auth] Info', props<{ jwt: string }>());
export const infoSuccess = createAction('[Auth] Info Success', props<{ user: User }>());
export const infoFailure = createAction('[Auth] Info Failure', props<{ error: Error }>());
