import { Routes } from '@angular/router';
import { PendingUserListComponent }
from './pagess/pending-user-list/pending-user-list';

import { UserApprovalDetailsComponent }
from './pagess/user-approval-details/user-approval-details';


export const USER_APPROVAL_ROUTES: Routes = [
  {
    path: '',
    component: PendingUserListComponent
  },
    {
    path: ':id',
    component: UserApprovalDetailsComponent
  }
];