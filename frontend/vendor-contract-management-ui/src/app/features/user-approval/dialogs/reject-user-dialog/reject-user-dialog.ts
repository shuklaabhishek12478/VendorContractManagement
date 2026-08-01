import {
  ChangeDetectorRef,
  Component,
  Inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PendingUser }
from '../../../../core/models/user-approval-model/pending-user.model';

import { UserApprovalService }
from '../../../../core/services/user-approval.service';

@Component({
  selector: 'app-reject-user-dialog',
  standalone: true,
  templateUrl: './reject-user-dialog.html',
  styleUrls: ['./reject-user-dialog.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]
})
export class RejectUserDialogComponent {

  form: FormGroup;

  saving = false;

  constructor(
    private fb: FormBuilder,
    private approvalService: UserApprovalService,
    private snackBar: MatSnackBar,
    
  private cdr: ChangeDetectorRef,

    private dialogRef:
      MatDialogRef<RejectUserDialogComponent>,

    @Inject(MAT_DIALOG_DATA)
    public user: PendingUser
  ) {

    this.form = this.fb.group({

      reason: [
        '',
        [
          Validators.required,
          Validators.maxLength(500)
        ]
      ]

    });

  }

  reject(): void {

    if (this.form.invalid)
      return;

    this.saving = true;

    this.approvalService
      .reject(
        this.user.id,
        this.form.value
      )
      .subscribe({

        next: () => {

          this.saving = false;
          this.cdr.detectChanges();

          this.dialogRef.close(true);

        },

        error: err => {

          this.saving = false;

          this.cdr.detectChanges();

          this.snackBar.open(

            err.error?.message ||

            'Unable to reject user.',

            'Close',

            {
              duration: 3000
            });

        }

      });

  }

  cancel(): void {

    this.dialogRef.close(false);

  }

}