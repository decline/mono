import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@mono/auth/data-access';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';

export const authRootPath = 'auth';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
    ],
  },
  {
    path: authRootPath,
    loadChildren: () => import('@mono/auth/feature').then(m => m.AuthFeatureModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
