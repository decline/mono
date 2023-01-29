import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  authenticated$ = this.store.pipe(select(AuthSelectors.getAuthenticated));
  authenticating$ = this.store.pipe(select(AuthSelectors.getAuthenticating));
  jwt$ = this.store.pipe(select(AuthSelectors.getJwt));
  error$ = this.store.pipe(select(AuthSelectors.getError));

  constructor(private readonly store: Store) {}

  login(username: string, password: string, redirectTo: string | null) {
    this.store.dispatch(AuthActions.login({ username, password, redirectTo }));
  }

  checkAuthentication() {
    this.store.dispatch(AuthActions.checkAuthentication());
  }

  revokeAuthentication() {
    this.store.dispatch(AuthActions.revokeAuthentication());
  }
}
