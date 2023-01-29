import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthLoginModule } from './auth-login/auth-login.module';

@NgModule({
  imports: [
    CommonModule,
    AuthLoginModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: AuthLoginComponent },
    ]),
  ],
})
export class AuthFeatureModule {}
