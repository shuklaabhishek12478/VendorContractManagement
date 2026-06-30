import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { VendorService } from '../../../../core/services/vendor.service';
import { Vendor } from '../../../../core/models/vendor.model';
import { ChangeDetectorRef } from '@angular/core';
import { VendorGeneralInfoComponent } from '../../../../shared/components/vendor-general-info/vendor-general-info';
import { VendorContactInfoComponent } from '../../../../shared/components/vendor-contact-info/vendor-contact-info';
import { VendorComplianceInfoComponent } from '../../../../shared/components/vendor-compliance-info/vendor-compliance-info';

@Component({
  selector: 'app-vendor-details',
  standalone: true,
  imports: [
    CommonModule,
    VendorGeneralInfoComponent,
    VendorContactInfoComponent,
    VendorComplianceInfoComponent
  ],
  templateUrl: './vendor-details.html',
  styleUrl: './vendor-details.scss'
})
export class VendorDetailsComponent implements OnInit {

  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private vendorService = inject(VendorService);

  vendor: Vendor | null = null;

  isLoading = true;

  constructor() {
  console.log('VendorDetails Constructor', Math.random());
}

  ngOnInit(): void {

  console.log('VendorDetailsComponent Loaded');

  const id = Number(this.route.snapshot.paramMap.get('id'));

  console.log('Vendor Id:', id);

  this.loadVendor(id);
}

loadVendor(id: number): void {

  console.log('Calling Vendor API...');

  console.log('Component Instance', this);

  this.vendorService.getById(id).subscribe({

   next: (vendor) => {

    this.vendor = vendor;

    this.isLoading = false;

    this.cdr.detectChanges();

    },

    error: (error) => {

      console.error(error);

      this.isLoading = false;

    }

  });

}

  back(): void {

    this.router.navigate([
      '/vendors'
    ]);

  }

  editVendor(): void {

    if (!this.vendor) {

      return;

    }

    this.router.navigate([
      '/vendors/edit',
      this.vendor.id
    ]);

  }

}