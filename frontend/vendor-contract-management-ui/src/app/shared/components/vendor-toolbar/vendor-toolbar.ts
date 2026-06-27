import { Component } from '@angular/core';

import { AddVendorButtonComponent } from '../add-vendor-button/add-vendor-button';
import { EditVendorButtonComponent } from '../edit-vendor-button/edit-vendor-button';
import { ArchiveVendorButtonComponent } from '../archive-vendor-button/archive-vendor-button';
import { RemoveVendorButtonComponent } from '../remove-vendor-button/remove-vendor-button';

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

}