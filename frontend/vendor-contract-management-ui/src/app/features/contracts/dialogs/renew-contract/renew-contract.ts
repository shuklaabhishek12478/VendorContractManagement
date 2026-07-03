import { Component, inject } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-renew-contract',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './renew-contract.html'
})
export class RenewContractComponent {

  private fb = inject(FormBuilder);

  dialogRef =
    inject(MatDialogRef<RenewContractComponent>);

  data =
    inject(MAT_DIALOG_DATA);

  form = this.fb.group({

    newEndDate: [
      null,
      Validators.required
    ],

    newContractValue: [
      null,
      [
        Validators.required,
        Validators.min(1)
      ]
    ]

  });

  save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    this.dialogRef.close(this.form.value);

  }

  cancel(): void {

    this.dialogRef.close();

  }

}