import {
  Component,
  inject
} from '@angular/core';

import { PermissionService } from '../../../core/services/permission';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-vendor-actions-renderer',
  standalone: true,

  imports: [
    MatButtonModule,
    MatIconModule
  ],

  templateUrl: './vendor-actions-renderer.html',
  styleUrl: './vendor-actions-renderer.scss',
})
export class VendorActionsRenderer {

  private readonly permissionService =
    inject(PermissionService);


  params: any;


  agInit(params: any): void {

    this.params = params;

  }


  refresh(): boolean {

    return false;

  }


  toggleStatus(): void {

    if (!this.params?.data) {
      return;
    }


    if (this.params.data.isActive) {

      this.params.context.componentParent
        .deactivateVendor(
          this.params.data.id
        );

    }
    else {

      this.params.context.componentParent
        .activateVendor(
          this.params.data.id
        );

    }

  }


  canToggleStatus(): boolean {

    if (!this.params?.data) {
      return false;
    }


    if (this.params.data.isActive) {

      return this.permissionService.hasPermission(
        'Vendor.Deactivate'
      );

    }


    return this.permissionService.hasPermission(
      'Vendor.Activate'
    );

  }

}