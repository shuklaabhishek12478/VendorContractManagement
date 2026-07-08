import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { VendorFormComponent } from '../../../../shared/components/vendor-form/vendor-form';
import { VendorService } from '../../../../core/services/vendor.service';

@Component({
  selector: 'app-add-vendor',
  standalone: true,
  imports: [
    CommonModule,
    VendorFormComponent
  ],
  templateUrl: './add-vendor.html',
  styleUrl: './add-vendor.scss'
})
export class AddVendorComponent {

  private vendorService = inject(VendorService);

  private snackBar = inject(MatSnackBar);

  private router = inject(Router);

 saveVendor(data: any): void {

  this.vendorService
    .createVendor(data)
    .subscribe({

      next: (vendorId: number) => {

        this.snackBar.open(
          'Vendor created successfully.',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          }
        );

        this.router.navigate([
          '/vendors',
          vendorId
        ]);

      },

      error: error => {

        console.error(error);

      }

    });

}
  cancel(): void {

    this.router.navigate(['/vendors']);

  }

}