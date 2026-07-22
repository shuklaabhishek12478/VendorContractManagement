import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular';

import {
  ColDef,
  GridApi,
  GridReadyEvent,
  RowDoubleClickedEvent,
  ICellRendererParams,
  ValueGetterParams
} from 'ag-grid-community';

import { UserToolbarComponent } from '../../components/user-toolbar/user-toolbar';

import { UserService } from '../../../../../core/services/user.service';
import { User } from '../../../../../core/models/user.model';
import { MatCardModule } from '@angular/material/card';
import { UserFilterComponent } from '../../components/user-filter/user-filter';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  DomLayoutType
} from 'ag-grid-community';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    AgGridAngular,
    MatCardModule,
  UserFilterComponent,
    UserToolbarComponent
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  loading = false;

  private gridApi!: GridApi;

  rowSelection: 'single' = 'single';

  pagination = true;

  paginationPageSize = 10;
  selectedUser?: User;

selectedUserId = 0;
totalUsers = 0;

activeUsers = 0;

inactiveUsers = 0;

adminUsers = 0;
filteredUsers: User[] = [];

searchText = '';

statusFilter: boolean | null = null;

roleFilter = '';

animateRows=true

rowHeight=72

headerHeight=50

currentPage = 1;

pageSize = 10;

totalPages = 1;

totalRecords = 0;

pageSizeOptions = [10,20,50,100];

suppressCellFocus=true


domLayout: DomLayoutType = 'normal';

  defaultColDef: ColDef = {

    sortable: true,

    filter: true,

   

    resizable: true,
    flex: 1,

    minWidth: 140

  };

  columnDefs: ColDef[] = [
     {
  field: 'id',
  headerName: 'ID',
  width: 100,
  checkboxSelection: true,
  headerCheckboxSelection: true,
  
},
    {
    headerName: '',
    width: 80,
    sortable: false,
    filter: false,

    cellRenderer: (params: ICellRendererParams<User>) => {

    if (!params.data) {
        return '';
    }

    const initials = params.data.fullName
        .split(' ')
        .map((x: string) => x.charAt(0))
        .join('')
        .substring(0, 2)
        .toUpperCase();

    return `
        <div class="avatar-circle">
            ${initials}
        </div>
    `;
}

},

   {
    headerName: 'User',
    field: 'fullName',
    flex: 2.8,
    minWidth: 260,

    cellRenderer: (params: ICellRendererParams<User>) => {

        return `

        <div class="user-info">

            <div class="user-name">

                ${params.data?.fullName ?? ''}

            </div>

            

        </div>

        `;

    }

},

    {
  field: 'roles',

  headerName: 'Roles',

  flex: 2,

  cellRenderer: (params: ICellRendererParams<User>) => {

    const roles = params.value ?? [];

    return roles
        .map((r: string) =>
            `<span class="role-chip">${r}</span>`
        )
        .join('');

}

},
{
  field:'vendorName',

  headerName:'Vendor',

  flex:2,

  cellRenderer:(params:ICellRendererParams<User>)=>{

      return params.value

      ? params.value

      : '<span class="text-muted">No Vendor</span>';

  }

},

    {
  field:'isActive',

  headerName:'Status',

  width:140,

  cellRenderer:(params:ICellRendererParams<User>)=>{

      return params.value

?

`<span class="status-active">

Active

</span>`

:

`<span class="status-inactive">

Inactive

</span>`;

  }

}


  ];

  constructor(
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef,
     private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.loadUsers();

  }

  loadUsers(): void {

    this.loading = true;

    this.userService
      .getAll()
      .subscribe({

        next: (users) => {

           console.log(users);
          this.users = users;

this.applyFilters();

this.totalUsers = users.length;

this.activeUsers =
  users.filter(x => x.isActive).length;

this.inactiveUsers =
  users.filter(x => !x.isActive).length;

this.adminUsers =
  users.filter(x =>
      x.roles?.includes('Administrator') ||
      x.roles?.includes('Admin')
  ).length;
  this.totalRecords = users.length;

this.totalPages = Math.ceil(
    this.totalRecords / this.pageSize
);

          this.loading = false;
            this.cdr.detectChanges();

        },

        error: (error) => {

           console.log(error);
          console.error(error);

          this.loading = false;
            this.cdr.detectChanges();

        }

      });

  }

 previousPage() {

    if (!this.gridApi) return;

    this.gridApi.paginationGoToPreviousPage();

    this.currentPage =
        this.gridApi.paginationGetCurrentPage() + 1;

}

nextPage() {

    if (!this.gridApi) return;

    this.gridApi.paginationGoToNextPage();

    this.currentPage =
        this.gridApi.paginationGetCurrentPage() + 1;

}

changePageSize(event: Event) {

    const value =
        +(event.target as HTMLSelectElement).value;

    this.pageSize = value;

    this.paginationPageSize = value;

    this.gridApi.setGridOption(
        'paginationPageSize',
        value
    );

    this.currentPage = 1;

    this.totalPages = Math.ceil(
        this.totalRecords / value
    );

}

  onRowDoubleClicked(
    event: RowDoubleClickedEvent<User>
  ): void {

    if (!event.data)
      return;

    this.router.navigate([
      '/users',
      event.data.id
    ]);

  }

  refresh(): void {

    this.loadUsers();

  }


  onGridReady(event: GridReadyEvent): void {

  this.gridApi = event.api;

this.currentPage =
    this.gridApi.paginationGetCurrentPage() + 1;

this.totalPages =
    this.gridApi.paginationGetTotalPages();

  console.log('Grid Ready');

  console.log(this.users);

  

}

onSelectionChanged(): void {

  const rows =
    this.gridApi.getSelectedRows();

  if (rows.length > 0) {

    this.selectedUser = rows[0];

    this.selectedUserId = rows[0].id;

  }
  else {

    this.selectedUser = undefined;

    this.selectedUserId = 0;

  }

}

editUser(): void {

  if (!this.selectedUserId)
    return;

  this.router.navigate([
    '/users/edit',
    this.selectedUserId
  ]);

}

onSearch(value: string): void {

    this.searchText = value;

    this.applyFilters();

}

onStatusChanged(value: boolean | null): void {

    this.statusFilter = value;

    this.applyFilters();

}

onRoleChanged(value: string): void {

    this.roleFilter = value;

    this.applyFilters();

}

applyFilters(): void {

    this.filteredUsers = this.users.filter(user => {

        const matchesSearch =

            user.fullName.toLowerCase().includes(this.searchText.toLowerCase())

            ||

            user.email.toLowerCase().includes(this.searchText.toLowerCase());

        const matchesStatus =

            this.statusFilter === null ||

            user.isActive === this.statusFilter;

        const matchesRole =

            !this.roleFilter ||

            user.roles.includes(this.roleFilter);

        return matchesSearch && matchesStatus && matchesRole;

    });

}

exportUsers() {

  this.userService
      .exportUsers()
      .subscribe({

        next: (blob) => {

          const url =
            window.URL.createObjectURL(blob);

          const a =
            document.createElement('a');

          a.href = url;

          a.download = 'Users.xlsx';

          a.click();

          window.URL.revokeObjectURL(url);

          this.snackBar.open(
            'Users exported successfully.',
            'Close',
            {
              duration: 3000
            });

        },

        error: () => {

          this.snackBar.open(
            'Unable to export users.',
            'Close',
            {
              duration: 3000
            });

        }

      });

}

importUsers(file: File) {

  this.userService
      .importUsers(file)
      .subscribe({

        next: () => {

          this.snackBar.open(

            'Users imported successfully.',

            'Close',

            {

              duration: 3000

            });

          this.loadUsers();
          this.cdr.detectChanges();
        },

        error: () => {

          this.snackBar.open(

            'Unable to import users.',

            'Close',

            {

              duration: 3000

            });
         this.cdr.detectChanges();
        }

      });

}

onPaginationChanged(): void {

    if (!this.gridApi) return;

    this.currentPage =
        this.gridApi.paginationGetCurrentPage() + 1;

    this.totalPages =
        this.gridApi.paginationGetTotalPages();

}
}