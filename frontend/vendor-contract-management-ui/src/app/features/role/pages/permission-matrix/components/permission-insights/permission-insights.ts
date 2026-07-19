import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-permission-insights',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './permission-insights.html',
  styleUrls: ['./permission-insights.scss']
})
export class PermissionInsightsComponent {

  @Input() highestModule = '';
  @Input() highestModulePercent = 0;

  @Input() lowestModule = '';
  @Input() lowestModulePercent = 0;

  @Input() riskyModule = '';
  @Input() riskyModuleCount = 0;

}