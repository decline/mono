import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './+state/auth.effects';
import * as fromAuth from './+state/auth.reducer';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AUTH_ROOT_PATH } from './providers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor,
    },
  ],
})
export class AuthDataAccessModule {
  static forRoot(authRootPath: string): ModuleWithProviders<AuthDataAccessModule> {
    return {
      ngModule: AuthDataAccessModule,
      providers: [
        {
          provide: AUTH_ROOT_PATH,
          useValue: authRootPath,
        },
        {
          provide: Storage,
          useValue: localStorage,
        },
      ],
    };
  }
}
