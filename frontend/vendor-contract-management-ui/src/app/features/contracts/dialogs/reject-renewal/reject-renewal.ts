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

import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';

import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-reject-renewal',
  standalone: true,

  imports: [

    CommonModule,

    ReactiveFormsModule,

    MatDialogModule,

    MatButtonModule,

    MatInputModule,

    MatFormFieldModule

  ],

  templateUrl: './reject-renewal.html'

})
export class RejectRenewalComponent {

  private fb = inject(FormBuilder);

  dialogRef =
    inject(MatDialogRef<RejectRenewalComponent>);

  data =
    inject(MAT_DIALOG_DATA);

  form = this.fb.group({

    reason: [

      '',

      [

        Validators.required,

        Validators.minLength(5)

      ]

    ]

  });

  save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    this.dialogRef.close(

      this.form.value.reason

    );

  }

  cancel(): void {

    this.dialogRef.close();

  }

}