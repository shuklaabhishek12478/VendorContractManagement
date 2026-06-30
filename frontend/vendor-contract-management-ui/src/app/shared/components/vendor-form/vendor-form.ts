import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  inject
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';

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
export class VendorFormComponent implements OnChanges {

  private fb = inject(FormBuilder);

  @Input()
  vendor: Vendor | null = null;

  @Input()
  isEditMode = false;

  @Output()
  formSubmitted = new EventEmitter<any>();

  @Output()
  formCancelled = new EventEmitter<void>();
  isSubmitting = false;

  vendorForm = this.fb.group({

  vendorName: [
    '',
    [
      Validators.required,
      Validators.maxLength(100)
    ]
  ],

  companyName: [
    '',
    [
      Validators.required,
      Validators.maxLength(150)
    ]
  ],

  gstNumber: [
    '',
    [
      Validators.required,
      Validators.pattern(
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/
      )
    ]
  ],

  panNumber: [
    '',
    [
      Validators.required,
      Validators.pattern(
        /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
      )
    ]
  ],

  contactPerson: [
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

  phone: [
    '',
    [
      Validators.required,
      Validators.pattern(/^[6-9]\d{9}$/)
    ]
  ],

  address: [
    '',
    Validators.required
  ]

});

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['vendor'] && this.vendor) {

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

  }

  submit(): void {

    if (this.vendorForm.invalid) {

      this.vendorForm.markAllAsTouched();

      return;

    }
    this.isSubmitting = true;
    this.formSubmitted.emit(
      this.vendorForm.getRawValue()
    );

  }

  cancel(): void {

    this.formCancelled.emit();

  }

}