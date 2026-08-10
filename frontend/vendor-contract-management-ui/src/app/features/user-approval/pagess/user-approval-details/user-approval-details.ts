import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router} from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PendingUser } from '../../../../core/models/user-approval-model/pending-user.model';
import { UserApprovalService } from '../../../../core/services/user-approval.service';
import { ApproveUserDialogComponent } from '../../dialogs/approve-user-dialog/approve-user-dialog';
import { RejectUserDialogComponent } from '../../dialogs/reject-user-dialog/reject-user-dialog';
import { PermissionService } from '../../../../core/services/permission';

@Component({
  selector: 'app-user-approval-details',
  standalone: true,
  templateUrl: './user-approval-details.html',
  styleUrls: ['./user-approval-details.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ]
})
export class UserApprovalDetailsComponent
implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private approvalService: UserApprovalService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private permissionService: PermissionService
  ) {}

  user?: PendingUser;

  loading = false;
  actionLoading = false;

  get canApprove(): boolean {

  return this.permissionService.hasPermission(
    'UserApproval.Approve'
  );

}

get canReject(): boolean {

  return this.permissionService.hasPermission(
    'UserApproval.Reject'
  );

}

  ngOnInit(): void {

    const id =
      Number(this.route.snapshot.paramMap.get('id'));

    this.loadUser(id);

  }

  loadUser(id: number): void {

    this.loading = true;

    this.approvalService
      .getById(id)
      .subscribe({

        next: res => {

          this.user = res;

          this.loading = false;

          this.cdr.detectChanges();

        },

        error: () => {

          this.loading = false;

          this.snackBar.open(
            'Unable to load user.',
            'Close',
            {
              duration: 3000
            });

        }

      });

  }

  approve(): void {

    if (!this.user)
      return;

     if (!this.canApprove)
    return;


    const dialogRef =
      this.dialog.open(
        ApproveUserDialogComponent,
        {
          width: '550px',
          disableClose: true,
          data: this.user
        });

    dialogRef.afterClosed()
      .subscribe(result => {

        if (result === true) {

          this.snackBar.open(
            'User approved successfully.',
            'Close',
            {
              duration: 3000
            });

          this.router.navigate([
            '/user-approval'
          ]);

        }

      });

  }

  reject(): void {

    if (!this.user)
      return;

     if (!this.canReject)
    return;

    const dialogRef =
      this.dialog.open(
        RejectUserDialogComponent,
        {
          width: '550px',
          disableClose: true,
          data: this.user
        });

    dialogRef.afterClosed()
      .subscribe(result => {

        if (result === true) {

          this.snackBar.open(
            'User rejected successfully.',
            'Close',
            {
              duration: 3000
            });

          this.router.navigate([
            '/user-approval'
          ]);

        }

      });

  }

  back(): void {

    this.router.navigate([
      '/user-approval'
    ]);

  }

  

}