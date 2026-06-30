import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Vendor } from '../../../core/models/vendor.model';

@Component({
  selector: 'app-vendor-compliance-info',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './vendor-compliance-info.html',
  styleUrl: './vendor-compliance-info.scss'
})
export class VendorComplianceInfoComponent {

  @Input()
  vendor!: Vendor;

}