import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AddVendorButtonComponent } from '../add-vendor-button/add-vendor-button';
import { EditVendorButtonComponent } from '../edit-vendor-button/edit-vendor-button';
import { ArchiveVendorButtonComponent } from '../archive-vendor-button/archive-vendor-button';
import { RemoveVendorButtonComponent } from '../remove-vendor-button/remove-vendor-button';
import { Vendor } from '../../../core/models/vendor.model';

@Component({
  selector: 'app-vendor-toolbar',
  standalone: true,
  imports: [
    AddVendorButtonComponent,
    EditVendorButtonComponent,
    ArchiveVendorButtonComponent,
    RemoveVendorButtonComponent
  ],
  templateUrl: './vendor-toolbar.html',
  styleUrl: './vendor-toolbar.scss'
})
export class VendorToolbarComponent {
  @Input()
  selectedVendor: Vendor | null = null;

  @Input()
  selectedVendors: Vendor[] = [];

  get canAdd(): boolean {
  return this.selectedVendors.length === 0;
}

  get canEdit(): boolean {
    return this.selectedVendor !== null;
  }

  get canArchive(): boolean {
    return this.selectedVendors.length > 0;
  }

  get canRemove(): boolean {
    return this.selectedVendors.length > 0;
  }

  @Output() add = new EventEmitter<void>();

@Output() edit = new EventEmitter<void>();

@Output() archive = new EventEmitter<void>();

@Output() remove = new EventEmitter<void>();


}