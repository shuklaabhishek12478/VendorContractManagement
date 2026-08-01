import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit
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
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PendingUser } from '../../../../core/models/user-approval-model/pending-user.model';
import { Role } from '../../../../core/models/role.model';

import { UserApprovalService } from '../../../../core/services/user-approval.service';
import { RoleService } from '../../../../core/services/role.service';

@Component({
  selector: 'app-approve-user-dialog',
  standalone: true,
  templateUrl: './approve-user-dialog.html',
  styleUrls: ['./approve-user-dialog.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ]
})
export class ApproveUserDialogComponent
implements OnInit {

  form!: FormGroup;

  roles: Role[] = [];

  loadingRoles = false;

  saving = false;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private approvalService: UserApprovalService,
    private snackBar: MatSnackBar,
  private cdr: ChangeDetectorRef,

    private dialogRef:
      MatDialogRef<ApproveUserDialogComponent>,

    @Inject(MAT_DIALOG_DATA)
    public user: PendingUser
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({

      roleId: [
        null,
        Validators.required
      ]

    });

    this.loadRoles();

  }

  loadRoles(): void {

     console.log("loadRoles Started");

    this.loadingRoles = true;

    this.roleService
      .getAll()
      .subscribe({

        next: res => {

          this.roles = res;
          this.loadingRoles = false;
          this.cdr.detectChanges();

        },

        error: (err) => {
            console.log("Role Error", err);
          this.loadingRoles = false;
          this.cdr.detectChanges();
          this.snackBar.open(
            'Unable to load roles.',
            'Close',
            {
              duration: 3000
            });
            

        }

      });

  }

  approve(): void {

    if (this.form.invalid)
      return;

    this.saving = true;

    this.approvalService
      .approve(
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

          this.snackBar.open(

            err.error?.message ||

            'Unable to approve user.',

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