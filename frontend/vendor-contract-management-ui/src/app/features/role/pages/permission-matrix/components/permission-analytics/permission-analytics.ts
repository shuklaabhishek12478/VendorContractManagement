import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-permission-analytics',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './permission-analytics.html',
  styleUrls: ['./permission-analytics.scss']
})
export class PermissionAnalyticsComponent {

  @Input() assignmentRate = 0;

  @Input() viewPermissions = 0;

  @Input() editPermissions = 0;

  @Input() deletePermissions = 0;

  @Input() highRiskPermissions = 0;

  @Input() riskScore = 0;

  @Input() riskColor = '#22c55e';

  @Input() riskLevel = 'Low';

}