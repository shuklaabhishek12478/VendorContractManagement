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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-vendor-form',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
     MatSelectModule,
      MatIconModule,
  MatDividerModule,
  MatProgressBarModule,
   MatProgressSpinnerModule,
   MatSnackBarModule
  ],
  templateUrl: './vendor-form.html',
  styleUrl: './vendor-form.scss'
})
export class VendorFormComponent implements OnInit, OnChanges {

  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  
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
autoSaveStatus = 'All Changes Saved';
validationErrors: string[] = [];
requiredFieldsCompleted = 0;
requiredFieldsRemaining = 0;
generalCompleted = false;
contactCompleted = false;
complianceCompleted = false;
financialCompleted = false;
emailExists = false;
gstExists = false;
panExists = false;
checkingEmail = false;
checkingGst = false;
checkingPan = false;
hideAccountNumber = true;



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
      Validators.pattern(/^[6-9]\d{4}\s\d{5}$/)
    ]
  ],

  address: [
    '',
    Validators.required
  ],
  bankName: [
  '',
  [
    Validators.required,
    Validators.maxLength(100)
  ]
],

accountHolderName: [
  '',
  [
    Validators.required,
    Validators.maxLength(100)
  ]
],

accountNumber: [
  '',
  [
    Validators.required,
    Validators.pattern(/^\d{9,18}$/)
  ]
],

ifscCode: [
  '',
  [
    Validators.required,
    Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)
  ]
],

branchName: [
  '',
  [
    Validators.required,
    Validators.maxLength(100)
  ]
],

swiftCode: [
  '',
  [
    Validators.required,
    Validators.pattern(/^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/)
  ]
],

paymentMethod: this.fb.control<PaymentMethod | null>(
  null,
  Validators.required
),

paymentTerms: this.fb.control(
  '',
  Validators.required
),

preferredCurrency: this.fb.control<Currency | null>(
  null,
  Validators.required
),
});




ngOnInit(): void {

  this.restoreDraft();

  this.vendorForm.valueChanges.subscribe(() => {

    this.hasUnsavedChanges = true;
    this.autoSaveStatus = 'Unsaved Changes';
    this.calculateCompletion();

  });

  this.enableAutoSave();
  this.restoreDraft();
  this.convertToUpperCase('gstNumber');
this.convertToUpperCase('panNumber');
this.convertToUpperCase('ifscCode');
this.convertToUpperCase('swiftCode');


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

   const requiredControls = [

    'vendorName',
    'companyName',
    'contactPerson',
    'email',
    'phone',
    'address',
    'gstNumber',
    'panNumber',
    'bankName',
    'accountHolderName',
    'accountNumber',
    'ifscCode',
    'branchName',
    'swiftCode',
    'paymentMethod',
    'paymentTerms',
    'preferredCurrency'

  ];

  this.requiredFieldsCompleted = requiredControls.filter(control => {

    const value = this.vendorForm.get(control)?.value;

    return value !== null &&
           value !== undefined &&
           value !== '';

  }).length;

  this.requiredFieldsRemaining =
    requiredControls.length - this.requiredFieldsCompleted;
  
  this.generalCompleted =
  !!this.vendorForm.get('vendorName')?.value &&
  !!this.vendorForm.get('companyName')?.value;

this.contactCompleted =
  !!this.vendorForm.get('contactPerson')?.value &&
  !!this.vendorForm.get('email')?.value &&
  !!this.vendorForm.get('phone')?.value &&
  !!this.vendorForm.get('address')?.value;

this.complianceCompleted =
  !!this.vendorForm.get('gstNumber')?.value &&
  !!this.vendorForm.get('panNumber')?.value;

this.financialCompleted =
  !!this.vendorForm.get('bankName')?.value &&
  !!this.vendorForm.get('accountHolderName')?.value &&
  !!this.vendorForm.get('accountNumber')?.value &&
  !!this.vendorForm.get('ifscCode')?.value &&
  !!this.vendorForm.get('branchName')?.value &&
  !!this.vendorForm.get('swiftCode')?.value &&
  !!this.vendorForm.get('paymentMethod')?.value &&
  !!this.vendorForm.get('paymentTerms')?.value &&
  !!this.vendorForm.get('preferredCurrency')?.value;
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
      this.focusFirstInvalidField();
      this.scrollToFirstInvalidField();
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

  const dialogRef = this.dialog.open(
    ConfirmationDialogComponent,
    {
      width: '430px',
      disableClose: true,
      data: {
        title: 'Reset Form',
        message:
          'Are you sure you want to clear all entered data?\n\nAll unsaved changes will be permanently removed.',
        confirmText: 'Reset Form'
      }
    }
  );

  dialogRef.afterClosed().subscribe(result => {

    if (!result) {
      return;
    }

    this.vendorForm.reset({
      preferredCurrency: null,
      paymentMethod: null,
      paymentTerms: ''
    });

    localStorage.removeItem('vendor-draft');

    this.lastAutoSaved = null;

    this.autoSaveStatus = 'All Changes Saved';

    this.calculateCompletion();

    this.validationErrors = [];

    this.hasUnsavedChanges = false;

  });

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
      this.activeSection = 'general-section';
      this.generalSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      break;

    case 'contact':
      this.activeSection = 'contact-section';
      this.contactSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      break;

    case 'compliance':
      this.activeSection = 'compliance-section';
      this.complianceSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      break;

    case 'financial':
      this.activeSection = 'financial-section';
      this.financialSection.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      break;
  }

}

isSectionComplete(section: string): boolean {

  switch (section) {

    case 'general':
      return !!(
        this.vendorForm.get('vendorName')?.value &&
        this.vendorForm.get('companyName')?.value
      );

    case 'contact':
      return !!(
        this.vendorForm.get('contactPerson')?.value &&
        this.vendorForm.get('email')?.value &&
        this.vendorForm.get('phone')?.value &&
        this.vendorForm.get('address')?.value
      );

    case 'compliance':
      return !!(
        this.vendorForm.get('gstNumber')?.value &&
        this.vendorForm.get('panNumber')?.value
      );

    case 'financial':
      return !!(
        this.vendorForm.get('bankName')?.value &&
        this.vendorForm.get('accountHolderName')?.value &&
        this.vendorForm.get('accountNumber')?.value &&
        this.vendorForm.get('ifscCode')?.value &&
        this.vendorForm.get('branchName')?.value &&
        this.vendorForm.get('swiftCode')?.value &&
        this.vendorForm.get('paymentMethod')?.value &&
        this.vendorForm.get('paymentTerms')?.value &&
        this.vendorForm.get('preferredCurrency')?.value
      );

    default:
      return false;

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

  const scrollPosition = window.scrollY + 180;

  for (const section of sections) {

    const element = document.getElementById(section);

    if (!element) {
      continue;
    }

    const offsetTop = element.offsetTop;
    const offsetBottom = offsetTop + element.offsetHeight;

    if (
      scrollPosition >= offsetTop &&
      scrollPosition < offsetBottom
    ) {

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
  this.autoSaveStatus = 'Auto Saving...';

  localStorage.setItem(
    'vendor-draft',
    JSON.stringify(this.vendorForm.getRawValue())
  );

  this.lastAutoSaved = new Date();
  this.snackBar.open(
  'Draft auto-saved',
  'OK',
  {
    duration: 2000,
    horizontalPosition: 'end',
    verticalPosition: 'top'
  }
);

  this.isAutoSaving = false;
  this.autoSaveStatus = 'All Changes Saved';

}

private restoreDraft(): void {

  const draft = localStorage.getItem('vendor-draft');

  if (!draft) {
    return;
  }

  const restore = confirm(
    'A saved draft was found.\n\nDo you want to restore it?'
  );

  if (restore) {

    const draftData = JSON.parse(draft);

    this.vendorForm.patchValue(draftData);

    this.vendorForm.updateValueAndValidity();

    this.calculateCompletion();

    this.vendorForm.markAsDirty();

    this.hasUnsavedChanges = true;

    this.snackBar.open(
      'Draft restored successfully',
      'OK',
      {
        duration: 2500,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      }
    );

  } else {

    localStorage.removeItem('vendor-draft');

  }

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

   if (controls.bankName.invalid) {
    this.validationErrors.push('Bank Name is required.');
  }

  if (controls.accountHolderName.invalid) {
    this.validationErrors.push('Account Holder Name is invalid.');
  }

  if (controls.accountNumber.invalid) {
    this.validationErrors.push('Account Number is invalid.');
  }

  if (controls.ifscCode.invalid) {
    this.validationErrors.push('IFSC Code is invalid.');
  }
  if (controls.branchName.invalid) {
    this.validationErrors.push('Branch Name is required.');
  }

  if (controls.swiftCode.invalid) {
    this.validationErrors.push('Swift Code is required.');
  }

  if (controls.paymentMethod.invalid) {
    this.validationErrors.push('Payment Method is invalid.');
  }

  if (controls.paymentTerms.invalid) {
    this.validationErrors.push('Payment Terms is invalid.');
  }

  if (controls.preferredCurrency.invalid) {
    this.validationErrors.push('Preferred Currency is invalid.');
  }

}

private focusFirstInvalidField(): void {

  const firstInvalidControl = document.querySelector(

    'form .ng-invalid'

  ) as HTMLElement;

  if (!firstInvalidControl) {
    return;
  }

  firstInvalidControl.scrollIntoView({

    behavior: 'smooth',

    block: 'center'

  });

  setTimeout(() => {

    firstInvalidControl.focus();

  }, 300);

}

getSectionProgress(section: string): string {

  switch (section) {

    case 'general':

      return `${this.countFilled([
        'vendorName',
        'companyName'
      ])}/2`;

    case 'contact':

      return `${this.countFilled([
        'contactPerson',
        'email',
        'phone',
        'address'
      ])}/4`;

    case 'compliance':

      return `${this.countFilled([
        'gstNumber',
        'panNumber'
      ])}/2`;

    case 'financial':

      return `${this.countFilled([
        'bankName',
        'accountHolderName',
        'accountNumber',
        'ifscCode',
        'branchName',
        'swiftCode',
        'paymentMethod',
        'paymentTerms',
        'preferredCurrency'
      ])}/9`;

    default:

      return '';

  }

}

private countFilled(fields: string[]): number {

  return fields.filter(field => {

    const value = this.vendorForm.get(field)?.value;

    return value !== null &&
           value !== undefined &&
           value !== '';

  }).length;

}

getSectionPercentage(section: string): number {

  switch (section) {

    case 'general':
      return this.calculateSectionPercentage(2, [
        'vendorName',
        'companyName'
      ]);

    case 'contact':
      return this.calculateSectionPercentage(4, [
        'contactPerson',
        'email',
        'phone',
        'address'
      ]);

    case 'compliance':
      return this.calculateSectionPercentage(2, [
        'gstNumber',
        'panNumber'
      ]);

    case 'financial':
      return this.calculateSectionPercentage(9, [
        'bankName',
        'accountHolderName',
        'accountNumber',
        'ifscCode',
        'branchName',
        'swiftCode',
        'paymentMethod',
        'paymentTerms',
        'preferredCurrency'
      ]);

    default:
      return 0;

  }

}

private calculateSectionPercentage(
  total: number,
  fields: string[]
): number {

  const filled = fields.filter(field => {

    const value = this.vendorForm.get(field)?.value;

    return value !== null &&
           value !== undefined &&
           value !== '';

  }).length;

  return Math.round((filled / total) * 100);

}

private convertToUpperCase(controlName: string): void {

  const control = this.vendorForm.get(controlName);

  if (!control) return;

  control.valueChanges.subscribe(value => {

    if (!value) return;


        const formatted = value
      .toUpperCase()
      .replace(/\s+/g, '');

    if (formatted !== value) {

      control.setValue(formatted, {
        emitEvent: false
      });

    }

    

  });

}

private scrollToFirstInvalidField(): void {

  const firstInvalid = document.querySelector(
    '.mat-mdc-form-field.mat-form-field-invalid'
  ) as HTMLElement;

  if (!firstInvalid) {
    return;
  }

  const firstInvalidControl =
    document.querySelector(
      'input.ng-invalid, textarea.ng-invalid, mat-select.ng-invalid'
    ) as HTMLElement;

  if (!firstInvalidControl) {
    return;
  }

  firstInvalidControl.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });

  setTimeout(() => {

    firstInvalidControl.focus();

  }, 500);

}

formatPhoneNumber(event: Event): void {

  const input = event.target as HTMLInputElement;

  let value = input.value.replace(/\D/g, '');

  value = value.substring(0, 10);

  if (value.length > 5) {

    value =
      value.substring(0, 5) +
      ' ' +
      value.substring(5);

  }

  input.value = value;

  this.vendorForm
      .get('phone')
      ?.setValue(value, { emitEvent: false });

}

formatAccountNumber(event: Event): void {

  const input = event.target as HTMLInputElement;

  let value = input.value.replace(/\D/g, '');

  value = value.substring(0, 18);

  input.value = value;

  this.vendorForm
      .get('accountNumber')
      ?.setValue(value, { emitEvent: false });

}

formatIfscCode(event: Event): void {

  const input = event.target as HTMLInputElement;

  const formatted = input.value
    .toUpperCase()
    .replace(/\s+/g, '')
    .substring(0, 11);

  input.value = formatted;

  this.vendorForm
      .get('ifscCode')
      ?.setValue(formatted, { emitEvent: false });

}

formatSwiftCode(event: Event): void {

  const input = event.target as HTMLInputElement;

  const formatted = input.value
    .toUpperCase()
    .replace(/\s+/g, '')
    .substring(0, 11);

  input.value = formatted;

  this.vendorForm
      .get('swiftCode')
      ?.setValue(formatted, { emitEvent: false });

}

hasSectionErrors(section: string): boolean {

  switch (section) {

    case 'general':
      return ['vendorName', 'companyName']
        .some(field =>
          this.vendorForm.get(field)?.invalid &&
          this.vendorForm.get(field)?.touched
        );

    case 'contact':
      return ['contactPerson', 'email', 'phone', 'address']
        .some(field =>
          this.vendorForm.get(field)?.invalid &&
          this.vendorForm.get(field)?.touched
        );

    case 'compliance':
      return ['gstNumber', 'panNumber']
        .some(field =>
          this.vendorForm.get(field)?.invalid &&
          this.vendorForm.get(field)?.touched
        );

    case 'financial':
      return [
        'bankName',
        'accountHolderName',
        'accountNumber',
        'ifscCode',
        'branchName',
        'swiftCode',
        'paymentMethod',
        'paymentTerms',
        'preferredCurrency'
      ]
      .some(field =>
        this.vendorForm.get(field)?.invalid &&
        this.vendorForm.get(field)?.touched
      );

    default:
      return false;
  }

}
isSectionStarted(section: string): boolean {

  let fields: string[] = [];

  switch (section) {

    case 'general':
      fields = ['vendorName', 'companyName'];
      break;

    case 'contact':
      fields = ['contactPerson', 'email', 'phone', 'address'];
      break;

    case 'compliance':
      fields = ['gstNumber', 'panNumber'];
      break;

    case 'financial':
      fields = [
        'bankName',
        'accountHolderName',
        'accountNumber',
        'ifscCode',
        'branchName',
        'swiftCode',
        'paymentMethod',
        'paymentTerms',
        'preferredCurrency'
      ];
      break;
  }

  return fields.some(field => {

    const value = this.vendorForm.get(field)?.value;

    return value !== null &&
           value !== undefined &&
           value.toString().trim() !== '';

  });

}
}