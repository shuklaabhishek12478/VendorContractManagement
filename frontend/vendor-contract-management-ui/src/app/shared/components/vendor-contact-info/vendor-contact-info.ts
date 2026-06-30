import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Vendor } from '../../../core/models/vendor.model';

@Component({
  selector: 'app-vendor-contact-info',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './vendor-contact-info.html',
  styleUrl: './vendor-contact-info.scss'
})
export class VendorContactInfoComponent {

  @Input()
  vendor!: Vendor;

}