import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Vendor } from '../../../core/models/vendor.model';

@Component({
  selector: 'app-vendor-general-info',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './vendor-general-info.html',
  styleUrl: './vendor-general-info.scss'
})
export class VendorGeneralInfoComponent {

  @Input()
  vendor!: Vendor;

}