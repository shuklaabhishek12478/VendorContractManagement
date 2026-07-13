import {
  Component,
  Input
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { RecentActivity } from '../../../../core/models/recent-activity.model';

@Component({
  selector: 'app-recent-activity',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './recent-activity.html',
  styleUrls: ['./recent-activity.scss']
})
export class RecentActivityComponent {

  @Input()
  activities: RecentActivity[] = [];

  getIcon(module: string): string {

    switch (module) {

      case 'Vendor':
        return '🏢';

      case 'Contract':
        return '📄';

      case 'Document':
        return '📁';

      default:
        return '📌';

    }

  }

}