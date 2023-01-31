import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { AuthFacade } from '../+state/auth.facade';
import { AUTH_ROOT_PATH } from '../providers';

export const queryParamRedirectToAfterLogin = 'redirectTo';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AUTH_ROOT_PATH) private authRootPath: string,
    private authFacade: AuthFacade,
    private router: Router
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authFacade.checkAuthentication();

    return this.authFacade.authenticated$.pipe(
      filter(authenticated => authenticated !== null && authenticated !== undefined),
      map(authenticated =>
        authenticated
          ? true
          : this.router.createUrlTree([this.authRootPath, 'login'], {
              queryParams: { [queryParamRedirectToAfterLogin]: state.url },
            })
      )
    );
  }
}
