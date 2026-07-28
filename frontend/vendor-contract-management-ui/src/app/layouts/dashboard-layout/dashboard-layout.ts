import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Topbar } from '../../shared/components/topbar/topbar';
import { LayoutService } from '../../core/services/layout/layout.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone:true,
  imports: [
    RouterOutlet,
    Sidebar,
    Topbar
  ],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss',
})
export class DashboardLayout {
  layout = inject(LayoutService);
}