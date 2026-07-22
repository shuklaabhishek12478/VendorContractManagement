import { Routes } from '@angular/router';
import { AddUserComponent } from './pages/add-user/add-user';
import { UserListComponent } from './pages/user-list/user-list';
import { UserDetailsComponent } from './pages/user-details/user-details';
import { EditUserComponent } from './pages/edit-user/edit-user';


export const USER_ROUTES: Routes = [

  {
    path: '',
    component: UserListComponent
  },

  {
    path: 'add',
    component: AddUserComponent
  },

  {
    path: ':id',
    component: UserDetailsComponent
  },

  {
    path: 'edit/:id',
    component: EditUserComponent
  }

];