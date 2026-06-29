import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from '../../../../core/models/vendor.model';
import { VendorService } from '../../../../core/services/vendor.service';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-vendor-details',
  standalone: true,
  imports: [CommonModule,
    MatTabsModule,ReactiveFormsModule,
  ReactiveFormsModule,
MatFormFieldModule,
MatInputModule,
MatButtonModule],
  templateUrl: './vendor-details.html',
  styleUrl: './vendor-details.scss'
})
export class VendorDetailsComponent implements OnInit {
private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private vendorService = inject(VendorService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  



constructor() {
  console.log('VENDOR DETAILS COMPONENT LOADED');
}

vendorForm = this.fb.group({

  vendorName: [
    '',
    Validators.required
  ],

  companyName: [
    '',
    Validators.required
  ],

  email: [
    '',
    [
      Validators.required,
      Validators.email
    ]
  ],

  phone: ['']

});

 // vendor?: Vendor;
  id!: number;
  vendor?: Vendor | null = null;

isLoading = true;

isEditMode = false;

  ngOnInit(): void {

  const id =
    Number(
      this.route.snapshot.paramMap.get('id')
    );
 this.loadVendor(id);
  console.log('Vendor Id:', id);

  this.vendorService
    .getById(id)
    .subscribe({

 next: (response) => {

  this.vendor = response;

  this.cdr.detectChanges();

  console.log('Vendor:', this.vendor);
}
    });
}


loadVendor(id: number): void {

  this.vendorService
      .getById(id)
      .subscribe({

        next: (vendor) => {

          this.vendor = vendor;

          this.isLoading = false;

          console.log(vendor);

        },

        error: (error) => {

          console.error(error);

          this.isLoading = false;

        }

      });

}
back(): void {
  this.router.navigate(['/vendors']);
}



enableEditMode(): void {

  if (!this.vendor) {

    return;

  }

  this.vendorForm.patchValue({

    vendorName: this.vendor.vendorName,

    companyName: this.vendor.companyName,

    email: this.vendor.email,

    phone: this.vendor.phone

  });

  this.isEditMode = true;

}


cancelEdit(): void {

    this.isEditMode = false;

}
}