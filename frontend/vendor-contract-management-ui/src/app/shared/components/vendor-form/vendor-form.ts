import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  inject,
  OnInit
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
import { MatSelectModule } from '@angular/material/select';
import { Vendor } from '../../../core/models/vendor.model';
import { PaymentMethod } from '../../../core/models/payment-method.enum';
import { Currency } from '../../../core/models/currency.enum';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {
  HostListener
} from '@angular/core';
@Component({
  selector: 'app-vendor-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
     MatSelectModule,
      MatIconModule,
  MatDividerModule
  ],
  templateUrl: './vendor-form.html',
  styleUrl: './vendor-form.scss'
})
export class VendorFormComponent implements OnInit, OnChanges {

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
  hasUnsavedChanges = false;
  

  paymentMethods = [

  {
    value: PaymentMethod.NEFT,
    label: 'NEFT'
  },

  {
    value: PaymentMethod.RTGS,
    label: 'RTGS'
  },

  {
    value: PaymentMethod.IMPS,
    label: 'IMPS'
  },

  {
    value: PaymentMethod.UPI,
    label: 'UPI'
  },

  {
    value: PaymentMethod.WireTransfer,
    label: 'Wire Transfer'
  },

  {
    value: PaymentMethod.Cheque,
    label: 'Cheque'
  }

];

paymentTerms = [

  'Advance',

  'Net 15',

  'Net 30',

  'Net 45',

  'Net 60'

];

currencies = [

  {
    value: Currency.INR,
    label: 'INR'
  },

  {
    value: Currency.USD,
    label: 'USD'
  },

  {
    value: Currency.EUR,
    label: 'EUR'
  },

  {
    value: Currency.GBP,
    label: 'GBP'
  },

  {
    value: Currency.AED,
    label: 'AED'
  }

];

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
  ],
  bankName: [''],

accountHolderName: [''],

accountNumber: [''],

ifscCode: [
  '',
  [
    Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)
  ]
],

branchName: [''],

swiftCode: [''],

paymentMethod: this.fb.control<PaymentMethod | null>(null),

  paymentTerms: this.fb.control<string>(''),

  preferredCurrency: this.fb.control<Currency | null>(Currency.INR)

});


ngOnInit(): void {

  this.vendorForm.valueChanges.subscribe(() => {

    this.hasUnsavedChanges = true;

  });

}

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

        address: this.vendor.address,

        bankName: this.vendor.bankName,
        accountHolderName: this.vendor.accountHolderName,
        accountNumber: this.vendor.accountNumber,
        ifscCode: this.vendor.ifscCode,
        branchName: this.vendor.branchName,
        swiftCode: this.vendor.swiftCode,
        paymentMethod: this.vendor.paymentMethod,

paymentTerms: this.vendor.paymentTerms,

preferredCurrency: this.vendor.preferredCurrency


      });

      this.vendorForm.markAsPristine();

this.vendorForm.markAsUntouched();

this.hasUnsavedChanges = false;

    }

  }

  submit(): void {

    if (this.vendorForm.invalid) {

      this.vendorForm.markAllAsTouched();

      return;

    }
    this.hasUnsavedChanges = false;
    this.isSubmitting = true;
    this.formSubmitted.emit(
      this.vendorForm.getRawValue()
    );

  }

  cancel(): void {

    this.hasUnsavedChanges = false;

    this.formCancelled.emit();

  }

  @HostListener('window:beforeunload', ['$event'])
beforeUnload(event: BeforeUnloadEvent): void {

  if (!this.hasUnsavedChanges) {

    return;

  }

  event.preventDefault();

  event.returnValue = '';

}

}