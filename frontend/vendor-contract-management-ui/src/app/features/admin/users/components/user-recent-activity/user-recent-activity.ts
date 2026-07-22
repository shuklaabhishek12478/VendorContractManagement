import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { RecentActivity } from '../../../../../core/models/recent-activity.model';

@Component({
  selector: 'app-user-recent-activity',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './user-recent-activity.html',
  styleUrl: './user-recent-activity.scss'
})
export class UserRecentActivityComponent {

  @Input()
  activities: RecentActivity[] = [];
   
  getIcon(action: string): string {

  switch (action.toLowerCase()) {

    case 'create':
      return 'add_circle';

    case 'update':
      return 'edit';

    case 'delete':
      return 'delete';

    case 'login':
      return 'login';

    case 'logout':
      return 'logout';

    case 'approve':
      return 'check_circle';

    case 'reject':
      return 'cancel';

    case 'upload':
      return 'upload_file';

    case 'download':
      return 'download';

    case 'assign role':
      return 'admin_panel_settings';

    case 'reset password':
      return 'lock_reset';

    default:
      return 'history';
  }

}
}