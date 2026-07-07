import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { VendorService } from '../../../../core/services/vendor.service';
import { Vendor } from '../../../../core/models/vendor.model';
import { ChangeDetectorRef } from '@angular/core';
import { VendorGeneralInfoComponent } from '../../../../shared/components/vendor-general-info/vendor-general-info';
import { VendorContactInfoComponent } from '../../../../shared/components/vendor-contact-info/vendor-contact-info';
import { VendorComplianceInfoComponent } from '../../../../shared/components/vendor-compliance-info/vendor-compliance-info';
import { VendorContractsComponent } from '../../../../shared/components/vendor-contracts/vendor-contracts';
import { Contracts } from '../../../../core/models/contracts.model';
import { VendorFinancialInfoComponent } from '../../../../shared/components/vendor-financial-info/vendor-financial-info';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-vendor-details',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    VendorGeneralInfoComponent,
    VendorContactInfoComponent,
    VendorComplianceInfoComponent,
    VendorContractsComponent,
    VendorFinancialInfoComponent,
    MatIconModule,
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
  readonly defaultExpanded = 'general';
  isLoading = true;

  contracts: Contracts[] = [];
  step = 0;

setStep(index: number): void {
  this.step = index;
}

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

    this.loadContracts(vendor.id);

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

  loadContracts(vendorId: number): void {

  this.vendorService
    .getContracts(vendorId)
    .subscribe({

      next: (contracts) => {

        console.log('Contracts', contracts);

        this.contracts = contracts;

      },

      error: (error) => {

        console.error(error);

      }

    });

}

}