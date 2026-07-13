import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard-header.html',
  styleUrls: ['./dashboard-header.scss']
})
export class DashboardHeaderComponent {

  @Input() title = '';

  @Input() subtitle = '';

  @Input() userName = '';

  @Input() showQuickActions = true;

  @Output() addVendor = new EventEmitter<void>();

  @Output() addContract = new EventEmitter<void>();

}