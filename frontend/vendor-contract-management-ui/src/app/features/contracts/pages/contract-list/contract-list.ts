import {RowDoubleClickedEvent, SelectionChangedEvent } from 'ag-grid-community';
import { Contract } from "../../../../core/models/contract.model";
import { Component, inject, OnInit } from "@angular/core";
import { ContractService } from "../../../../core/services/contract.service";
import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import { ContractQuery } from "../../../../core/models/contract-query.model";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { AgGridAngular } from "ag-grid-angular";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { CONTRACT_STATUS_OPTIONS } from "../../../../core/constants/contract-status-options";
import { ContractToolbarComponent } from "../../components/contract-toolbar/contract-toolbar";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog';
import { forkJoin } from 'rxjs';
import { SnackbarService } from '../../../../core/services/snackbar.service';

@Component({
  selector: 'app-contract-list',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,

    AgGridAngular,
    
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ContractToolbarComponent
  ],

  templateUrl: './contract-list.html',
  styleUrls: ['./contract-list.scss']
})
export class ContractListComponent implements OnInit {

  private contractService = inject(ContractService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackbar = inject(SnackbarService);
  private gridApi!: GridApi;
  

  statusOptions = CONTRACT_STATUS_OPTIONS;
  contracts: Contract[] = [];
  selectedContract: Contract | null = null;

selectedContracts: Contract[] = [];
  selectedContractId: number | null = null;
  rowSelection = {
    mode: 'singleRow'
};
  totalRecords = 0;

  loading = false;

  ContractStatusOption = [

  { value: null, label: 'All' },

  { value: 0, label: 'Draft' },

  { value: 1, label: 'Pending Approval' },

  { value: 2, label: 'Approved' },

  { value: 3, label: 'Active' },

  { value: 4, label: 'Expired' },

  { value: 5, label: 'Rejected' },

  { value: 6, label: 'Renewed' },

  { value: 7, label: 'Renewal Pending' },

  { value: 8, label: 'Renewal Approved' },

  { value: 9, label: 'Renewal Rejected' },

  { value: 10, label: 'Terminated' }

];



  context = {
  componentParent: this
};

rowData: Contract[] = [
    
  ];





getRowId = (params: any) => params.data.id;

  query: ContractQuery = {

    pageNumber: 1,

    pageSize: 10,

    search: '',

    sortBy: '',

    sortDirection: '',

    status: null

  };

  columnDefs: ColDef[] = [];
  

  ngOnInit(): void {

    this.initializeColumns();

    this.loadContracts();

  }

  onGridReady(event: GridReadyEvent) {

    this.gridApi = event.api;

  }

  loadContracts(): void {

    this.loading = true;

    this.contractService
      .getPaged(this.query)
      .subscribe({

        next: response => {

          this.contracts = response.data;

          this.totalRecords = response.totalRecords;

          if (this.gridApi) {

        this.gridApi.setGridOption(
            'rowData',
            this.contracts
        );

    }

          this.loading = false;

        },

        error: error => {

          console.error(error);

          this.loading = false;

        }

      });

  }

  private initializeColumns(): void {

  this.columnDefs = [
    
    {
  field: 'id',
  headerName: 'ID',
  width: 100,
  checkboxSelection: true,
  headerCheckboxSelection: true,
  
},
    {
      headerName: 'Contract No.',
      field: 'contractNumber',
      sortable: true,
      filter: true,
      minWidth: 170
    },

    {
      headerName: 'Title',
      field: 'title',
      flex: 1,
      sortable: true,
      filter: true,
      minWidth: 120
   

    },

    {
      headerName: 'Vendor Id',
      field: 'vendorId',
      sortable: true,
      filter: true,
      width: 120
    },

    {
      headerName: 'Start Date',
      field: 'startDate',
      sortable: true,
      width: 140,
      valueFormatter: params => {

        if (!params.value) return '';

        return new Date(params.value)
          .toLocaleDateString();

      }
    },

    {
      headerName: 'End Date',
      field: 'endDate',
      sortable: true,
      width: 140,
      valueFormatter: params => {

        if (!params.value) return '';

        return new Date(params.value)
          .toLocaleDateString();

      }
    },

    {
      headerName: 'Value',
      field: 'contractValue',
      sortable: true,
      width: 150,
      valueFormatter: params =>

        new Intl.NumberFormat(
          'en-IN',
          {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
          }
        ).format(params.value)

    },

    {
    headerName: 'Status',

    field: 'status',

    sortable: true,

    width: 180,

    valueFormatter: params => {

        const status = CONTRACT_STATUS_OPTIONS.find(

            x => x.value === params.value

        );

        return status?.label ?? '';

    }

},

    {
       headerName: 'Actions',
       width: 120,
       sortable: false,
       filter: false,

      cellRenderer: () => {

        return `
            <button class="view-btn">
              View
            </button>
        `;

      },

      onCellClicked: params => {
           this.viewContract(params.data.id);
      }

    }

  ];

}


addContract(): void {
  this.router.navigate(['/contracts/add']);
}

viewContract(id: number): void {

  this.router.navigate([
    '/contracts',
    id
  ]);

}




onSelectionChanged(): void {

  const rows =
    this.gridApi.getSelectedRows();

  this.selectedContracts = rows;

  this.selectedContract =
    rows.length === 1
      ? rows[0]
      : null;

}

onAddContract(): void {

  this.router.navigate([
    '/contracts/add'
  ]);

}

onEditContract(): void {

  if (!this.selectedContract) {

    return;

  }

  this.router.navigate([
    '/contracts/edit',
    this.selectedContract.id
  ]);

}

archiveContracts(): void {

  if (this.selectedContracts.length === 0) {

    return;

  }

  const dialogRef = this.dialog.open(
    ConfirmationDialogComponent,
    {
      width: '420px',
      data: {

        title: 'Archive Contracts',

        message:
          `Archive ${this.selectedContracts.length} selected contract(s)?`

      }
    }
  );

  dialogRef.afterClosed().subscribe(result => {

    if (!result) {

      return;

    }

    const requests =
      this.selectedContracts.map(c =>

        this.contractService.archive(c.id)

      );

    forkJoin(requests).subscribe({

      next: (res) => {

  console.log(res);

  this.loadContracts();

  this.selectedContract = null;

  this.selectedContracts = [];


        this.snackbar.success(
          'Selected contracts archived successfully.',
          
        );

      },

      error: (err: any) => {

        console.error(err);

      }

    });

  });

}

removeContracts(): void {

  if (this.selectedContracts.length === 0) {

    return;

  }

  const dialogRef = this.dialog.open(
    ConfirmationDialogComponent,
    {
      width: '420px',
      data: {

        title: 'Remove Contracts',

        message:
          `Delete ${this.selectedContracts.length} selected contract(s)?`

      }
    }
  );

  dialogRef.afterClosed().subscribe(result => {

    if (!result) {

      return;

    }

    const requests =
      this.selectedContracts.map(c =>

        this.contractService.deleteContract(c.id)

      );

    forkJoin(requests).subscribe({

      next: (res) => {

  console.log(res);

  this.loadContracts();

  this.selectedContract = null;

  this.selectedContracts = [];

  this.snackbar.success(
    'Selected contracts removed successfully'
  );

},

      error: (err: any) => {

        console.error(err);

      }

    });

  });

}


onSearch(event: Event): void {

  const value =
    (event.target as HTMLInputElement).value;

  this.query.search = value;

  this.query.pageNumber = 1;

  this.loadContracts();

}

onStatusFilterChanged(event: Event): void {

  const value =
    (event.target as HTMLSelectElement).value;

  this.query.status =
    value === ''
      ? null
      : Number(value);

  this.query.pageNumber = 1;

  this.loadContracts();

}

onRowDoubleClicked(
    event: RowDoubleClickedEvent<Contract>
): void {

    this.router.navigate([
        '/contracts',
        event.data!.id
    ]);

}

onSortChanged(): void {

  const sortModel =
    this.gridApi.getColumnState()
      .find(c => c.sort);

  if (sortModel) {

    this.query.sortBy =
      sortModel.colId;

    this.query.sortDirection =
      sortModel.sort ?? '';

  } else {

    this.query.sortBy = '';

    this.query.sortDirection = '';

  }

  this.loadContracts();

}
}