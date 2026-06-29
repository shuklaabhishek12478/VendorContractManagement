import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  inject,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Vendor } from '../../../core/models/vendor.model';


@Component({
  selector: 'app-vendor-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './vendor-form.html',
  styleUrl: './vendor-form.scss'
})
export class VendorFormComponent implements OnInit{


  private fb = inject(FormBuilder);

  @Input()
  vendor: Vendor | null = null;

  @Input()
  isEditMode = false;

  @Output()
  formSubmit = new EventEmitter<any>();

 @Output()
formSubmitted = new EventEmitter<any>();

@Output()
formCancelled = new EventEmitter<void>();

  vendorForm = this.fb.group({

  vendorName: ['', Validators.required],

  companyName: ['', Validators.required],

  gstNumber: ['', Validators.required],

  panNumber: ['', Validators.required],

  contactPerson: ['', Validators.required],

  email: [
    '',
    [
      Validators.required,
      Validators.email
    ]
  ],

  phone: ['', Validators.required],

  address: ['', Validators.required]

});

ngOnInit(): void {

  if (!this.vendor) {

    return;

  }

  this.vendorForm.patchValue({

    vendorName: this.vendor.vendorName,

    companyName: this.vendor.companyName,

    gstNumber: this.vendor.gstNumber,

    panNumber: this.vendor.panNumber,

    contactPerson: this.vendor.contactPerson,

    email: this.vendor.email,

    phone: this.vendor.phone,

    address: this.vendor.address

  });

}

submit(): void {

  if (this.vendorForm.invalid) {

    this.vendorForm.markAllAsTouched();

    return;

  }

  this.formSubmitted.emit(
    this.vendorForm.getRawValue()
  );
}

cancel(): void {

  this.formCancelled.emit();

}
}