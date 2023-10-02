import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '@mono/common/data-access';
import { Error } from '@mono/common/shared';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@ngrx/router-store/data-persistence';
import { map, tap } from 'rxjs';
import { AuthHttpService } from '../services/auth-http.service';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  private readonly tokenStorageKey = 'auth-token';

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      fetch({
        run: action =>
          this.authHttpService.login(action.username, action.password).pipe(
            map(response =>
              AuthActions.loginSuccess({
                jwt: response.accessToken,
                redirectTo: action.redirectTo,
              })
            )
          ),
        onError: (_action, error: Error) => {
          console.error('Error', error);
          return AuthActions.loginFailure({ error });
        },
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(async action => {
          // store token in storage
          this.storageService.setItem(this.tokenStorageKey, action.jwt);

          // when redirect param was set, navigate to return url
          if (action.redirectTo) {
            await this.router.navigateByUrl(action.redirectTo);
          }
        })
      ),
    { dispatch: false }
  );

  checkAuthentication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkAuthentication),
      map(() => this.storageService.getItem(this.tokenStorageKey)),
      map(jwt => {
        if (jwt) {
          return AuthActions.info({ jwt });
        }
        return AuthActions.infoFailure({
          error: { message: 'No token found in storage' },
        });
      })
    )
  );

  info$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.info),
      fetch({
        run: () => this.authHttpService.info().pipe(map(user => AuthActions.infoSuccess({ user }))),
        onError: (_action, error: Error) => {
          console.error('Error', error);
          return AuthActions.infoFailure({ error });
        },
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private authHttpService: AuthHttpService,
    private router: Router,
    private storageService: StorageService
  ) {}
}
