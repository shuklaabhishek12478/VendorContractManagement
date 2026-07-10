import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vendor } from '../../../../core/models/vendor.model';
import { VendorService } from '../../../../core/services/vendor.service';
import { VendorFormComponent } from '../../../../shared/components/vendor-form/vendor-form';
import { ChangeDetectorRef } from '@angular/core';
import { CanComponentDeactivate } from '../../../../core/guards/pending-changes.guard';

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
export class EditVendorComponent implements OnInit, CanComponentDeactivate {

  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private allowNavigation = false;
  private vendorService = inject(VendorService);
  private cdr = inject(ChangeDetectorRef);

  vendor: Vendor | null = null;
  isLoading = true;
  @ViewChild(VendorFormComponent)
   vendorFormComponent!: VendorFormComponent;

  ngOnInit(): void {

     const id = Number(
     this.route.snapshot.paramMap.get('id')
    );

  this.loadVendor(id);

}

 /* cancel(): void {

  if (!this.vendor) {

    this.router.navigate(['/vendors']);

    return;

  }

  this.router.navigate([
    '/vendors',
    this.vendor.id
  ]);

}*/

loadVendor(id: number): void {

  console.log('Edit Vendor Id:', id);

  this.vendorService
    .getById(id)
    .subscribe({

      next: (vendor) => {

        console.log('Vendor Loaded:', vendor);

        this.vendor = vendor;

        this.isLoading = false;
         this.cdr.detectChanges();

      },

      error: (error) => {

        console.error('Vendor Load Error:', error);

        this.isLoading = false;
         this.cdr.detectChanges();

      }

    });

}

updateVendor(data: any): void {
    console.log(data);

  console.log(typeof data.preferredCurrency);

  console.log(data.preferredCurrency);

  console.log(typeof data.paymentMethod);

  console.log(data.paymentMethod);

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
              
            this.vendor = {

        ...this.vendor!,

        ...data

    };
              this.snackBar.open(

                 'Vendor updated successfully.',

                   'Close',

                  {

                        duration: 3000,

                        horizontalPosition: 'right',

                         verticalPosition: 'top'

                    }

                    );
                    this.allowNavigation = true;
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

cancel(): void {

  if (!this.vendor) {

    this.allowNavigation = true;

    this.router.navigate(['/vendors']);

    return;

  }

  if (!this.vendorFormComponent.vendorForm.dirty) {

    this.allowNavigation = true;

    this.router.navigate([
      '/vendors',
      this.vendor.id
    ]);

    return;

  }

  const confirmed = confirm(

    'You have unsaved changes.\n\nLeave this page?'

  );

  if (!confirmed) {

    return;

  }

  this.allowNavigation = true;

  this.router.navigate([
    '/vendors',
    this.vendor.id
  ]);

}

/*canDeactivate(): boolean {

  if (!this.vendorFormComponent) {

    return true;

  }

  if (!this.vendorFormComponent.vendorForm.dirty) {

    return true;

  }

  return confirm(

    'You have unsaved changes.\n\nLeave this page?'

  );

}*/

canDeactivate(): boolean {

  if (this.allowNavigation) {

    return true;

  }

  if (!this.vendorFormComponent) {

    return true;

  }

  return !this.vendorFormComponent.vendorForm.dirty;

}

}