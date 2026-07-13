import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentActivity } from '../../../../core/models/recent-activity.model';

@Component({
  selector: 'app-contract-recent-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contract-recent-activity.html',
  styleUrls: ['./contract-recent-activity.scss']
})
export class ContractRecentActivityComponent {

  @Input()
  activities: RecentActivity[] = [];

}