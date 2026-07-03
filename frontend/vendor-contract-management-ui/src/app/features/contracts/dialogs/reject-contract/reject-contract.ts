import { Component, inject } from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';

import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-reject-contract',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './reject-contract.html',
  styleUrls: ['./reject-contract.scss']
})
export class RejectContractComponent {

  private fb = inject(FormBuilder);

  private dialogRef =
    inject(MatDialogRef<RejectContractComponent>);

  form = this.fb.group({

    reason: [
      '',
      Validators.required
    ]

  });

  reject(): void {

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