import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Vendor } from '../../../../core/models/vendor.model';
import { VendorService } from '../../../../core/services/vendor.service';
import { VendorFormComponent } from '../../../../shared/components/vendor-form/vendor-form';


@Component({
  selector: 'app-edit-vendor',
  standalone: true,
  imports: [
    CommonModule,
    VendorFormComponent
  ],
  templateUrl: './vendor-edit.html',
  styleUrl: './vendor-edit.scss'
})
export class EditVendorComponent implements OnInit {

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private vendorService = inject(VendorService);

  vendor: Vendor | null = null;

  isLoading = true;

  ngOnInit(): void {

  const id = Number(
    this.route.snapshot.paramMap.get('id')
  );

  this.loadVendor(id);

}

  cancel(): void {

  if (!this.vendor) {

    this.router.navigate(['/vendors']);

    return;

  }

  this.router.navigate([
    '/vendors',
    this.vendor.id
  ]);

}

loadVendor(id: number): void {

  this.vendorService
      .getById(id)
      .subscribe({

          next: (vendor) => {

              this.vendor = vendor;

              this.isLoading = false;

          },

          error: (error) => {

              console.error(error);

              this.isLoading = false;

          }

      });

}

updateVendor(data: any): void {

  if (!this.vendor) {

    return;

  }

  this.vendorService
      .updateVendor(
          this.vendor.id,
          data
      )
      .subscribe({

          next: () => {

              this.router.navigate([
                  '/vendors',
                  this.vendor!.id
              ]);

          },

          error: (error) => {

              console.error(error);

          }

      });

}
}