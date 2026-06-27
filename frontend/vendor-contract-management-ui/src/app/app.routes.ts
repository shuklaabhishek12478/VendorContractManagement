import { Routes } from '@angular/router';

import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';

import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard';
import { LoginComponent } from './features/auth/pages/login/login';
import { VendorListComponent } from './features/vendors/pages/vendor-list/vendor-list';
import { authGuard } from './core/guards/auth.guard';
import { VendorDetailsComponent } from './features/vendors/pages/vendor-details/vendor-details';



export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '',
    component: DashboardLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'vendors',
        component: VendorListComponent
      },
      {
        path: 'vendors/:id',
        component: VendorDetailsComponent
      }
    ]
  },

  {
  path: 'login',
  component: LoginComponent
},

  {
    path: '**',
    redirectTo: 'login'
  }
];