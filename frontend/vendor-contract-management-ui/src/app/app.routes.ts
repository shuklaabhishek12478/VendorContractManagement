import { Routes } from '@angular/router';

import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';

import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard';
import { LoginComponent } from './features/auth/pages/login/login';
import { VendorListComponent } from './features/vendors/pages/vendor-list/vendor-list';
import { authGuard } from './core/guards/auth.guard';
import { VendorDetailsComponent } from './features/vendors/pages/vendor-details/vendor-details';
import { EditVendorComponent } from './features/vendors/pages/vendor-edit/vendor-edit';
import { pendingChangesGuard } from './core/guards/pending-changes.guard';
import { ContractListComponent } from './features/contracts/pages/contract-list/contract-list';
import { AddContractComponent } from './features/contracts/pages/add-contract/add-contract';
import { ContractDetailsComponent } from './features/contracts/pages/contract-details/contract-details';
import { EditContractComponent } from './features/contracts/pages/edit-contract/edit-contract';



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
        path:'vendors/edit/:id',
        component:EditVendorComponent,
        canDeactivate:[
         pendingChangesGuard
        ]

      },
      {
        path: 'vendors/:id',
        component: VendorDetailsComponent
      },
      {
  path: 'contracts',
  component: ContractListComponent
},

{
  path: 'contracts/add',
  component: AddContractComponent
 
},

{
  path: 'contracts/edit/:id',
  component: EditContractComponent
},

{
  path: 'contracts/:id',
  component: ContractDetailsComponent
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