import {
  Component,
  HostListener,
  inject,
  OnInit
} from '@angular/core';

import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { CommonModule } from '@angular/common';

import { LayoutService } from '../../../core/services/layout/layout.service';

interface SidebarMenu {

  title: string;

  icon: string;

  route: string;

  permission?: string;

  badge?: string;

}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar implements OnInit {

  readonly layout = inject(LayoutService);

  private readonly router = inject(Router);

  menus: SidebarMenu[] = [];

  ngOnInit(): void {

    this.loadMenus();

  }

  private loadMenus(): void {

    this.menus = [

      {
        title: 'Dashboard',
        icon: 'fa-solid fa-chart-line',
        route: '/dashboard'
      },

      {
        title: 'Vendors',
        icon: 'fa-solid fa-building',
        route: '/vendors'
      },

      {
        title: 'Contracts',
        icon: 'fa-solid fa-file-signature',
        route: '/contracts'
      },

      {
        title: 'Documents',
        icon: 'fa-solid fa-folder-open',
        route: '/documents'
      },

      {
        title: 'Expenditures',
        icon: 'fa-solid fa-wallet',
        route: '/expenditures'
      },

      {
        title: 'Reports',
        icon: 'fa-solid fa-chart-pie',
        route: '/reports',
        badge: 'Soon'
      },

      {
        title: 'Roles',
        icon: 'fa-solid fa-user-shield',
        route: '/roles'
      },

      {
        title: 'Users',
        icon: 'fa-solid fa-users',
        route: '/users'
      }

    ];

    // Future
    // this.menus = this.permissionService.filterMenus(this.menus);

  }

  navigate(route: string): void {

    this.router.navigateByUrl(route);

    if (this.layout.mobile()) {

      this.layout.closeSidebar();

    }

  }

  closeMobile(): void {

    this.layout.closeSidebar();

  }
  
@HostListener('window:keydown.control.b', ['$event'])
shortcut(event: Event): void {

  event.preventDefault();

  this.layout.toggleSidebar();

}

}