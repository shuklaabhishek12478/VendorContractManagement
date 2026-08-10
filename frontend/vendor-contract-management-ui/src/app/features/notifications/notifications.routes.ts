import { Routes } from '@angular/router';

import { NotificationPageComponent } from './pages/notification-page/notification-page';
import { permissionGuard } from '../../core/guards/permission.guard';

export const notificationRoutes: Routes = [

  {
    path: '',
    component: NotificationPageComponent,
     canActivate: [permissionGuard],
    data: {
      permission: 'Notification.View'
    }
  }

];