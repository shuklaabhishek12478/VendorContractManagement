import { Component, inject } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-reject-contract',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './reject-contract.html'
})
export class RejectContractComponent {

  private fb = inject(FormBuilder);

  dialogRef = inject(MatDialogRef<RejectContractComponent>);

  data = inject(MAT_DIALOG_DATA);

  form = this.fb.nonNullable.group({
    reason: [
      '',
      [
        Validators.required,
        Validators.minLength(5)
      ]
    ]

  });

  save() {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    this.dialogRef.close(this.form.value.reason);

  }

  cancel() {

    this.dialogRef.close();

  }

}