import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  GridApi,
  GridReadyEvent,
  ColDef,
  RowDoubleClickedEvent,
  RowSelectionOptions
} from 'ag-grid-community';

import { AgGridModule } from 'ag-grid-angular';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { PendingUser } from '../../../../core/models/user-approval-model/pending-user.model';
import { UserApprovalService } from '../../../../core/services/user-approval.service';

import { UserApprovalToolbarComponent }
from '../../components/user-approval-toolbar/user-approval-toolbar';
import { MatDialog } from '@angular/material/dialog';
import { ApproveUserDialogComponent } from '../../dialogs/approve-user-dialog/approve-user-dialog';
import { RejectUserDialogComponent } from '../../dialogs/reject-user-dialog/reject-user-dialog';

@Component({
  selector: 'app-pending-user-list',
  standalone: true,
  templateUrl: './pending-user-list.html',
  styleUrls: ['./pending-user-list.scss'],
  imports: [
    CommonModule,
    FormsModule,
    AgGridModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    UserApprovalToolbarComponent
  ]
})

export class PendingUserListComponent implements OnInit {

  constructor(
    private approvalService: UserApprovalService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  private gridApi!: GridApi;

  pendingUsers: PendingUser[] = [];

  selectedUser?: PendingUser;

  loading = false;

  searchText = '';

  todayCount = 0;

  rowSelection: RowSelectionOptions = {
  mode: 'singleRow',
  enableClickSelection: true
};

defaultColDef: ColDef = {
  sortable: true,
  filter: true,
  floatingFilter: true,
  resizable: true,
  flex: 1
};

columnDefs: ColDef[] = [

  {
    field: 'fullName',
    headerName: 'Full Name',
    minWidth: 220,
    flex: 2
  },

  {
    field: 'email',
    headerName: 'Email',
    minWidth: 250,
    flex: 2
  },

  {
    field: 'vendorName',
    headerName: 'Vendor',
    minWidth: 180,
    flex: 1.5
  },

  {
    field: 'createdOn',
    headerName: 'Requested On',
    minWidth: 170,
    flex: 1.2,
    valueFormatter: params =>
      params.value
        ? new Date(params.value).toLocaleDateString()
        : ''
  }

];

ngOnInit(): void {

  this.loadPendingUsers();

}

loadPendingUsers(): void {

  this.loading = true;

  this.selectedUser = undefined;

  this.approvalService
      .getPending()
      .subscribe({

        next: users => {

          this.pendingUsers = users;

          this.todayCount =
            users.filter(x =>
              new Date(x.createdOn).toDateString()
              === new Date().toDateString()
            ).length;

          this.loading = false;

          this.cdr.detectChanges();

        },

        error: () => {

          this.loading = false;

        }

      });

}

onGridReady(event: GridReadyEvent): void {

  this.gridApi = event.api;

}

onSelectionChanged(): void {

  const rows = this.gridApi.getSelectedRows();

  this.selectedUser =
      rows.length
          ? rows[0]
          : undefined;

}

onSearch(): void {

  if (!this.gridApi)
      return;

  this.gridApi.setGridOption(
      'quickFilterText',
      this.searchText
  );

}

refresh(): void {

  this.searchText = '';

  this.loadPendingUsers();

}

onRowDoubleClicked(
    event: RowDoubleClickedEvent
): void {

  this.router.navigate([
      '/user-approval',
      event.data.id
  ]);

}

openDetails(): void {

  if (!this.selectedUser)
      return;

  this.router.navigate([
      '/user-approval',
      this.selectedUser.id
  ]);
  

}

approveSelected(): void {

    if (!this.selectedUser)
        return;

    const dialogRef = this.dialog.open(
        ApproveUserDialogComponent,
        {
            width: '550px',
            disableClose: true,
            data: this.selectedUser
        });

    dialogRef.afterClosed()
        .subscribe(result => {

            if(result){

                this.loadPendingUsers();

            }

        });

}

rejectSelected(): void {

    if (!this.selectedUser)
        return;

    const dialogRef = this.dialog.open(
        RejectUserDialogComponent,
        {
            width: '550px',
            disableClose: true,
            data: this.selectedUser
        });

    dialogRef.afterClosed()
        .subscribe(result => {

            if(result){

                this.loadPendingUsers();

            }

        });

}

 
}