import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-permission-statistics',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './permission-statistics.html',
  styleUrl: './permission-statistics.scss'
})
export class PermissionStatisticsComponent {

  @Input() totalPermissions = 0;

  @Input() assignedPermissions = 0;

  @Input() moduleCount = 0;

}