import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-permission-risk-score',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './permission-risk-score.html',
  styleUrl: './permission-risk-score.scss'
})
export class PermissionRiskScoreComponent {

  @Input() riskScore = 0;

  @Input() riskColor = '#22c55e';

  @Input() riskLevel = '';

  @Input() highRiskPermissions = 0;

  @Input() deletePermissionCount = 0;

  @Input() approvePermissionCount = 0;

}