import { Component } from '@angular/core';

@Component({
  selector: 'app-vendor-actions-renderer',
  imports: [],
  templateUrl: './vendor-actions-renderer.html',
  styleUrl: './vendor-actions-renderer.scss',
})
export class VendorActionsRenderer {

  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

 /* edit(): void {
    this.params.context.componentParent
      .openEditVendorDialog(this.params.data);
  }

  delete(): void {
    this.params.context.componentParent
      .deleteVendor(this.params.data.id);
  }*/

  toggleStatus(): void {

    if (this.params.data.isActive) {

      this.params.context.componentParent
        .deactivateVendor(this.params.data.id);

    } else {

      this.params.context.componentParent
        .activateVendor(this.params.data.id);
    }
  }
}
