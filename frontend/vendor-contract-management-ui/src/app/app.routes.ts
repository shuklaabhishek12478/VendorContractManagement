import { Routes } from '@angular/router';

import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { AddVendorComponent } from './features/vendors/pages/add-vendor/add-vendor';
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
import { RoleListComponent } from './features/role/pages/role-list/role-list';
import { AddRoleComponent } from './features/role/pages/add-role/add-role';
import { EditRoleComponent } from './features/role/pages/edit-role/edit-role';
import { RoleDetailsComponent } from './features/role/components/role-details/role-details';
import { CloneRoleComponent } from './features/role/pages/clone-role/clone-role';
import { PermissionMatrixComponent } from './features/role/pages/permission-matrix/permission-matrix';
import { PermissionExportComponent } from './features/role/pages/permission-matrix/components/permission-export/permission-export';
import { PermissionImportComponent } from './features/role/pages/permission-matrix/components/permission-import/permission-import';
import { UserDetailsComponent } from './features/admin/users/pages/user-details/user-details';
import { EditUserComponent } from './features/admin/users/pages/edit-user/edit-user';
import { ResetPasswordComponent } from './features/admin/users/components/reset-password/reset-password';
import { AssignRolesComponent } from './features/admin/users/components/assign-roles/assign-roles';
import { NotificationPageComponent } from './features/notifications/pages/notification-page/notification-page';
import { RegisterComponent } from './features/auth/pages/register/register';
import { ForgotPasswordComponent } from './features/auth/pages/forgot-password/forgot-password';
import { ForgotPasswordResetComponent } from './features/auth/pages/forgot-password-reset/forgot-password-reset';
import { permissionGuard } from './core/guards/permission.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
  path:'register',
  component:RegisterComponent
},
{
    path: 'forgot-password',
    component: ForgotPasswordComponent
},
{
    path: 'forgot-password-reset',
    component: ForgotPasswordResetComponent
},

  {
    path: '',
    component: DashboardLayout,
    canActivate: [authGuard, permissionGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      
        data: {
  permission: 'Dashboard.View'
}
      },
      {
  path: 'notifications',
  component: NotificationPageComponent,
   canActivate: [
          permissionGuard
        ],

        data: {
          permission: 'Notification.View'
        }
},
      {
        path: 'vendors',
        component: VendorListComponent,
        canActivate: [
          permissionGuard
        ],

        data: {
          permission: 'Vendor.View'
        }
      },   
      {
        path: 'vendors/add',
        component: AddVendorComponent,
         canActivate: [
          permissionGuard
        ],

        data: {
          permission: 'Vendor.Create'
        }
      },   
      {
        path:'vendors/edit/:id',
        component:EditVendorComponent,
        canActivate: [
          permissionGuard
        ],

        canDeactivate: [
          pendingChangesGuard
        ],

        data: {
          permission: 'Vendor.Edit'
        }

      },
      {
        path: 'vendors/:id',
        component: VendorDetailsComponent,
        canActivate: [
          permissionGuard
        ],
        data: {
          permission: 'Vendor.ViewDetails'
        }
      },
      {
  path: 'contracts',
  component: ContractListComponent,
  canActivate: [
          permissionGuard
        ],
        data: {
          permission: 'Contract.View'
        }
},

{
  path: 'contracts/add',
  component: AddContractComponent,
  canActivate: [
          permissionGuard
        ],
        data: {
          permission: 'Contract.Create'
        }
 
},

{
  path: 'contracts/edit/:id',
  component: EditContractComponent,
  canActivate: [
          permissionGuard
        ],
        canDeactivate: [
          pendingChangesGuard
        ],
        data: {
          permission: 'Contract.Edit'
        }
},

{
  path: 'contracts/:id',
  component: ContractDetailsComponent,
  canActivate: [
          permissionGuard
        ],
        data: {
          permission: 'Contract.ViewDetails'
        }
  
},
{
  path: 'roles',
  component: RoleListComponent,
  canActivate: [permissionGuard],
  data: {
    permission: 'Role.View'
  }
},
{
  path: 'roles/add',
  component: AddRoleComponent,
  canActivate: [permissionGuard],
  data: {
    permission: 'Role.Create'
  }
},
{
  path: 'roles/edit/:id',
  component: EditRoleComponent,
    canActivate: [permissionGuard],
  canDeactivate: [pendingChangesGuard],
  data: {
    permission: 'Role.Edit'
  }
},
{
  path: 'roles/:id',
  component: RoleDetailsComponent,
  canActivate: [permissionGuard],
  data: {
    permission: 'Role.View'
  }
},
{
    path: 'roles/clone/:id',
    component: CloneRoleComponent,
     canActivate: [permissionGuard],
  data: {
    permission: 'Role.Clone'
  }
},
{
  path: 'roles/:id/permission-matrix',
  component: PermissionMatrixComponent,
  canActivate: [authGuard, permissionGuard],
  data: {
    permission: 'Role.PermissionMatrix'
  }
},
{
    path: 'roles/:id/permission-matrix/export',
    component: PermissionExportComponent,
    canActivate: [authGuard, permissionGuard],
     data: {
    permission: 'Role.PermissionMatrix'
  }
},
{
    path: 'roles/:id/permission-matrix/import',
    component: PermissionImportComponent,
    canActivate: [authGuard, permissionGuard],
    data: {
    permission: 'Role.PermissionMatrix'
  }
},
{
  path: 'expenditures',

  canActivate: [
    authGuard,
    permissionGuard
  ],

  data: {
    permission: 'Expenditure.View'
  },

  loadChildren: () =>
    import('./features/expenditures/expenditure.routes')
      .then(m => m.expenditureRoutes)
},
{
  path: 'reports',
  canActivate: [authGuard, permissionGuard],
  data: {
    permission: 'Report.View'
  },
  loadChildren: () =>
    import('./features/reports/reports-routes')
      .then(m => m.reportRoutes)
},

{
    path: 'users',
    canActivate: [
          permissionGuard
        ],
        data: {
          permission: 'User.View'
        },
    loadChildren: () =>
        import('./features/admin/users/users.routes')
            .then(m => m.USER_ROUTES)
},


{
    path: 'user-approval',
    loadChildren: () =>
        import('./features/user-approval/user-approval.routes')
        .then(m => m.USER_APPROVAL_ROUTES)
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