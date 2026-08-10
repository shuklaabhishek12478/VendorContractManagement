import { Routes } from '@angular/router';

import { AddUserComponent } from './pages/add-user/add-user';
import { UserListComponent } from './pages/user-list/user-list';
import { UserDetailsComponent } from './pages/user-details/user-details';
import { EditUserComponent } from './pages/edit-user/edit-user';

import { ResetPasswordComponent } from './components/reset-password/reset-password';
import { AssignRolesComponent } from './components/assign-roles/assign-roles';

import { permissionGuard } from '../../../core/guards/permission.guard';
import { pendingChangesGuard } from '../../../core/guards/pending-changes.guard';


export const USER_ROUTES: Routes = [


  {
    path: '',
    component: UserListComponent,
    canActivate: [permissionGuard],
    data: {
      permission: 'User.View'
    }
  },

  {
    path: 'add',
    component: AddUserComponent,
    canActivate: [permissionGuard],
    data: {
      permission: 'User.Create'
    }
  },

  
  {
    path: 'edit/:id',
    component: EditUserComponent,
    canActivate: [permissionGuard],
    canDeactivate: [pendingChangesGuard],
    data: {
      permission: 'User.Edit'
    }
  },

 
  {
    path: ':id/roles',
    component: AssignRolesComponent,
    canActivate: [permissionGuard],
    data: {
      permission: 'User.AssignRoles'
    }
  },


  {
    path: 'reset-password/:id',
    component: ResetPasswordComponent,
    canActivate: [permissionGuard],
    data: {
      permission: 'User.ResetPassword'
    }
  },


  {
    path: ':id',
    component: UserDetailsComponent,
    canActivate: [permissionGuard],
    data: {
      permission: 'User.ViewDetails'
    }
  },
  {
  path: ':id/roles',
  component: AssignRolesComponent,

  canActivate: [
    permissionGuard
  ],

  data: {
    permission: 'User.AssignRoles'
  }
},

{
  path: 'reset-password/:id',
  component: ResetPasswordComponent,

  canActivate: [
    permissionGuard
  ],

  data: {
    permission: 'User.ResetPassword'
  }
}

];