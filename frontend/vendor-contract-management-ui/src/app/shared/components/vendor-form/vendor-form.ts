import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { debounceTime } from 'rxjs/operators';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { ViewChild, ElementRef } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Vendor } from '../../../core/models/vendor.model';
import { PaymentMethod } from '../../../core/models/payment-method.enum';
import { Currency } from '../../../core/models/currency.enum';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { HostListener} from '@angular/core';

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
  MatDividerModule,
  MatProgressBarModule,
   MatProgressSpinnerModule
  ],
  templateUrl: './vendor-form.html',
  styleUrl: './vendor-form.scss'
})
export class VendorFormComponent implements OnInit, OnChanges {

  private fb = inject(FormBuilder);

  @ViewChild('generalSection')
generalSection!: ElementRef;

@ViewChild('contactSection')
contactSection!: ElementRef;

@ViewChild('complianceSection')
complianceSection!: ElementRef;

@ViewChild('financialSection')
financialSection!: ElementRef;
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
 completionPercentage = 0;
 activeSection = 'general-section';
 private autoSaveEnabled = true;
lastAutoSaved: Date | null = null;
isAutoSaving = false;
validationErrors: string[] = [];

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

  this.restoreDraft();

  this.vendorForm.valueChanges.subscribe(() => {

    this.hasUnsavedChanges = true;

    this.calculateCompletion();

  });

  this.enableAutoSave();

}
 


calculateCompletion(): void {

  const values = this.vendorForm.getRawValue();

  const totalFields = Object.keys(values).length;

  const filledFields = Object.values(values).filter(value => {

    return value !== null &&
           value !== undefined &&
           value !== '';

  }).length;

  this.completionPercentage = Math.round(

    (filledFields / totalFields) * 100

  );

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
this.calculateCompletion();

    }

  }

  submit(): void {

    if (this.vendorForm.invalid) {
      
      this.buildValidationSummary();
      this.vendorForm.markAllAsTouched();

      return;

    }
    localStorage.removeItem('vendor-draft');
    this.hasUnsavedChanges = false;
    this.validationErrors = [];
    this.isSubmitting = true;
    this.formSubmitted.emit(
      this.vendorForm.getRawValue()
    );

  }

  cancel(): void {

    localStorage.removeItem('vendor-draft');
    this.hasUnsavedChanges = false;

    this.formCancelled.emit();

  }

  resetForm(): void {

  const confirmReset = confirm(
    'Are you sure you want to clear all entered data?'
  );

  if (!confirmReset) {
    return;
  }

  this.vendorForm.reset({
    preferredCurrency: Currency.INR,
    paymentMethod: null,
    paymentTerms: ''
  });

  localStorage.removeItem('vendor-draft');

  this.calculateCompletion();

  this.validationErrors = [];

  this.hasUnsavedChanges = false;

}

  @HostListener('window:beforeunload', ['$event'])
beforeUnload(event: BeforeUnloadEvent): void {

  if (!this.hasUnsavedChanges) {

    return;

  }

  event.preventDefault();

  event.returnValue = '';

}

scrollToSection(section: string): void {

  switch (section) {

    case 'general':

      this.generalSection.nativeElement.scrollIntoView({

        behavior: 'smooth',

        block: 'start'

      });

      break;

    case 'contact':

      this.contactSection.nativeElement.scrollIntoView({

        behavior: 'smooth',

        block: 'start'

      });

      break;

    case 'compliance':

      this.complianceSection.nativeElement.scrollIntoView({

        behavior: 'smooth',

        block: 'start'

      });

      break;

    case 'financial':

      this.financialSection.nativeElement.scrollIntoView({

        behavior: 'smooth',

        block: 'start'

      });

      break;

  }

}

scrollTo(sectionId: string): void {

  document
    .getElementById(sectionId)
    ?.scrollIntoView({

      behavior: 'smooth',

      block: 'start'

    });

}

@HostListener('window:scroll', [])
onWindowScroll(): void {

  const sections = [

    'general-section',

    'contact-section',

    'compliance-section',

    'financial-section'

  ];

  for (const section of sections) {

    const element = document.getElementById(section);

    if (!element) {
      continue;
    }

    const rect = element.getBoundingClientRect();

    if (rect.top <= 150 && rect.bottom >= 150) {

      this.activeSection = section;

      break;

    }

  }

}

private enableAutoSave(): void {

  this.vendorForm.valueChanges
    .pipe(debounceTime(2000))
    .subscribe(() => {

      if (!this.autoSaveEnabled) return;

      if (!this.hasUnsavedChanges) return;

      this.autoSaveDraft();

    });

}

private autoSaveDraft(): void {

  this.isAutoSaving = true;

  localStorage.setItem(
    'vendor-draft',
    JSON.stringify(this.vendorForm.getRawValue())
  );

  this.lastAutoSaved = new Date();

  this.isAutoSaving = false;

}

private restoreDraft(): void {

  const draft = localStorage.getItem('vendor-draft');

  if (!draft) {
    return;
  }

  this.vendorForm.patchValue(JSON.parse(draft),
 {
    emitEvent: false
  });

}

private buildValidationSummary(): void {

  this.validationErrors = [];

  const controls = this.vendorForm.controls;

  if (controls.vendorName.invalid) {
    this.validationErrors.push('Vendor Name is required.');
  }

  if (controls.companyName.invalid) {
    this.validationErrors.push('Company Name is required.');
  }

  if (controls.contactPerson.invalid) {
    this.validationErrors.push('Contact Person is required.');
  }

  if (controls.email.invalid) {
    this.validationErrors.push('Valid Email Address is required.');
  }

  if (controls.phone.invalid) {
    this.validationErrors.push('Valid Phone Number is required.');
  }

  if (controls.address.invalid) {
    this.validationErrors.push('Address is required.');
  }

  if (controls.gstNumber.invalid) {
    this.validationErrors.push('GST Number is invalid.');
  }

  if (controls.panNumber.invalid) {
    this.validationErrors.push('PAN Number is invalid.');
  }

  if (controls.ifscCode.invalid) {
    this.validationErrors.push('IFSC Code is invalid.');
  }

}

}