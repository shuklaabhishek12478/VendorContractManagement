import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './stats-card.html',
  styleUrls: ['./stats-card.scss']
})
export class StatsCardComponent {

  @Input() title = '';

  @Input() value = '';

  @Input() icon = 'analytics';

  @Input() color = '#4F46E5';

  @Input() trend = '';

  @Input() loading = false;

}