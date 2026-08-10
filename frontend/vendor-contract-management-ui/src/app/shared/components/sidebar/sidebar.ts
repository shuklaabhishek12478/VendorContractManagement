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
import { PermissionService } from '../../../core/services/permission';

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
  private readonly permissionService =
  inject(PermissionService);
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
        route: '/dashboard',
         permission: 'Dashboard.View'
      },

      {
         title: 'Vendors',
         icon: 'fa-solid fa-building',
         route: '/vendors',
         permission: 'Vendor.View'
      },

     {
  title: 'Contracts',
  icon: 'fa-solid fa-file-signature',
  route: '/contracts',
  permission: 'Contract.View'
},

      {
        title: 'Expenditures',
        icon: 'fa-solid fa-wallet',
        route: '/expenditures',
        permission: 'Expenditure.View'
      },

      {
        title: 'Reports',
        icon: 'fa-solid fa-chart-pie',
        route: '/reports',
        permission: 'Report.View'
      },

      {
  title: 'Roles',
  icon: 'fa-solid fa-user-shield',
  route: '/roles',
  permission: 'Role.View'
},

      {
  title: 'Users',
  icon: 'fa-solid fa-users',
  route: '/users',
  permission: 'User.View'
},
      {
  title: 'Pending Users',
  icon: 'fa-solid fa-users',
  route: '/user-approval',
  permission: 'UserApproval.View'
}

    ];

   this.menus = this.menus.filter(menu => {

  if (!menu.permission) {
    return true;
  }

  return this.permissionService.hasPermission(
    menu.permission
  );

});
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