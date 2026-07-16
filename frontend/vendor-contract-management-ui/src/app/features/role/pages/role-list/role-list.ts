import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, RowDoubleClickedEvent, RowSelectionOptions } from 'ag-grid-community';
import { Role, RoleStatistics } from '../../../../core/models/role.model';
import { RoleService } from '../../../../core/services/role.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RoleToolbarComponent } from '../../components/role-toolbar/role-toolbar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent }
from '../../../../shared/components/confirmation-dialog/confirmation-dialog';
import { AssignPermissionsDialogComponent } from '../../dialogs/assign-permissions-dialog/assign-permissions-dialog';


@Component({
  selector: 'app-role-list',
  imports:[
    CommonModule,
    MatCardModule,
MatButtonModule,
MatIconModule,
AgGridModule,
FormsModule,
MatFormFieldModule,
MatInputModule,
MatSelectModule,
RoleToolbarComponent,
  ],
  templateUrl: './role-list.html',
  styleUrls: ['./role-list.scss']
})
export class RoleListComponent implements OnInit {
  private gridApi!: GridApi;
  roles: Role[] = [];
  statistics: RoleStatistics = {
  totalRoles: 0,
  activeRoles: 0,
  inactiveRoles: 0,
  systemRoles: 0,
  customRoles: 0
};
searchText = '';

selectedStatus: boolean | null = null;
  loading = false;
  columnDefs: ColDef[] = [];
 selectedRole?: Role;

selectedRows = 0;

rowSelection: RowSelectionOptions = {
  mode: 'singleRow',
  enableClickSelection: true
};

  constructor(
   private roleService: RoleService,
  private cdr: ChangeDetectorRef,
  private router: Router, private dialog: MatDialog,
  private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

  this.initializeColumns();

  this.loadRoles();
  this.search();

  this.loadStatistics();

}

 loadRoles(): void {

  this.loading = true;

  this.roleService.search({

    search: this.searchText,

    isActive: this.selectedStatus,

    page: 1,

    pageSize: 100

  }).subscribe({

    next: res => {

  console.log("API Result", res);

  this.roles = res;

  if (this.gridApi) {

    this.gridApi.setGridOption('rowData', res);

  }

  this.loading = false;

},

    error: () => {

      this.loading = false;

    }

  });

}
defaultColDef = {
  checkboxSelection: true
};

  initializeColumns(): void {

    this.columnDefs = [

      {
   
        field: 'name',
        headerName: 'Role',
        flex: 1.3,
        width: 60
      },

      {
        field: 'description',
        headerName: 'Description',
        flex: 2
      },

      {
        field: 'priority',
        headerName: 'Priority',
        width: 110
      },

      {
        field: 'userCount',
        headerName: 'Users',
        width: 110
      },

      {
        field: 'permissionCount',
        headerName: 'Permissions',
        width: 140
      },

      {
        field: 'isActive',
        headerName: 'Status',
        width: 120
      },

      {
        field: 'isSystemRole',
        headerName: 'System',
        width: 120
      }

    ];

  }

  loadStatistics(): void {

  this.roleService.getStatistics().subscribe({

    next: (res) => {

      console.log("Statistics API:", res);

      this.statistics = res;
      this.cdr.detectChanges();

    },

    error: (err) => {

      console.log("Statistics Error:", err);

    }

  });

}

search(): void {

  this.loadRoles();

}

onGridReady(params: GridReadyEvent): void {

  this.gridApi = params.api;

}

onSelectionChanged(): void {

  const rows = this.gridApi.getSelectedRows();

  this.selectedRole =
    rows.length > 0
      ? rows[0]
      : undefined;

}

addRole(): void {

  this.router.navigate(['/roles/add']);

}

editRole(): void {

  if (!this.selectedRole) return;

  this.router.navigate([
    '/roles/edit',
    this.selectedRole.id
  ]);

}

deleteRole(): void {

  if (!this.selectedRole) {

    return;

  }

  const dialogRef = this.dialog.open(
    ConfirmationDialogComponent,
    {

      width: '420px',

      data: {

        title: 'Delete Role',

        message:
          `Are you sure you want to delete "${this.selectedRole.name}"?`,

        confirmText: 'Delete',

        icon: 'delete'

      }

    });

  dialogRef.afterClosed().subscribe(result => {

    if (!result) {

      return;

    }

    this.roleService
      .delete(this.selectedRole!.id)
      .subscribe({

        next: () => {

          this.snackBar.open(

            'Role deleted successfully.',

            'Close',

            {

              duration: 3000

            });

          this.selectedRole = undefined;

          this.loadRoles();

          this.loadStatistics();

        },

        error: err => {

          this.snackBar.open(

            err.error?.message ||

            'Unable to delete role.',

            'Close',

            {

              duration: 3000

            });

        }

      });

  });

}

activateRole(): void {

  if (!this.selectedRole) return;

  const dialogRef = this.dialog.open(
    ConfirmationDialogComponent,
    {
      width: '420px',
      data: {
        title: 'Activate Role',
        message:
          `Activate "${this.selectedRole.name}"?`,
        confirmText: 'Activate',
        icon: 'check_circle'
      }
    });

  dialogRef.afterClosed().subscribe(result => {

    if (!result) return;

    this.roleService
      .activate(this.selectedRole!.id)
      .subscribe({

        next: () => {

          this.snackBar.open(
            'Role activated successfully.',
            'Close',
            {
              duration: 3000
            });

          this.selectedRole = undefined;

          this.loadRoles();

          this.loadStatistics();

        },

        error: err => {

          this.snackBar.open(

            err.error?.message ||

            'Unable to activate role.',

            'Close',

            {

              duration: 3000

            });

        }

      });

  });

}

deactivateRole(): void {

  if (!this.selectedRole) return;

  const dialogRef = this.dialog.open(
    ConfirmationDialogComponent,
    {
      width: '420px',
      data: {
        title: 'Deactivate Role',
        message:
          `Deactivate "${this.selectedRole.name}"?`,
        confirmText: 'Deactivate',
        icon: 'block'
      }
    });

  dialogRef.afterClosed().subscribe(result => {

    if (!result) return;

    this.roleService
      .deactivate(this.selectedRole!.id)
      .subscribe({

        next: () => {

          this.snackBar.open(
            'Role deactivated successfully.',
            'Close',
            {
              duration: 3000
            });

          this.selectedRole = undefined;

          this.loadRoles();

          this.loadStatistics();

        },

        error: err => {

          this.snackBar.open(

            err.error?.message ||

            'Unable to deactivate role.',

            'Close',

            {

              duration: 3000

            });

        }

      });

  });

}

assignPermissions(): void {

  if (!this.selectedRole) return;

  this.roleService

    .getPermissions(this.selectedRole.id)

    .subscribe(currentPermissions => {

      const dialogRef = this.dialog.open(

        AssignPermissionsDialogComponent,

        {

          width: '900px',

          maxHeight: '90vh',

          data: {

            currentPermissions

          }

        });

      dialogRef.afterClosed().subscribe(result => {

        if (!result) return;

        this.roleService

          .assignPermissions(

            this.selectedRole!.id,

            {

              permissionIds: result

            })

          .subscribe({

            next: () => {

              this.snackBar.open(

                'Permissions updated successfully.',

                'Close',

                {

                  duration: 3000

                });

            },

            error: err => {

              this.snackBar.open(

                err.error?.message ||

                'Unable to assign permissions.',

                'Close',

                {

                  duration: 3000

                });

            }

          });

      });

    });

}

assignUsers(): void {

  console.log("Assign Users");

}

cloneRole(): void {

  console.log("Clone");

}

onRowDoubleClicked(
  event: RowDoubleClickedEvent
): void {

  const role = event.data as Role;

  if (!role) {
    return;
  }

  this.router.navigate([
    '/roles',
    role.id
  ]);

}


}