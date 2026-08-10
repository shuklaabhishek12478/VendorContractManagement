import { Routes } from '@angular/router';

import { PendingUserListComponent } from './pagess/pending-user-list/pending-user-list';

import { UserApprovalDetailsComponent } from './pagess/user-approval-details/user-approval-details';

import { permissionGuard } from '../../core/guards/permission.guard';


export const USER_APPROVAL_ROUTES: Routes = [


  {
    path: '',
    component: PendingUserListComponent,

    canActivate: [
      permissionGuard
    ],

    data: {
      permission: 'UserApproval.View'
    }
  },


  {
    path: ':id',
    component: UserApprovalDetailsComponent,

    canActivate: [
      permissionGuard
    ],

    data: {
      permission: 'UserApproval.ViewDetails'
    }
  }

];