import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular';

import {
  ColDef,
  GridApi,
  GridReadyEvent
} from 'ag-grid-community';
import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Vendor } from '../../../../core/models/vendor.model';
import { Contract } from '../../../../core/models/contract.model';

import { VendorService } from '../../../../core/services/vendor.service';
import { ContractService } from '../../../../core/services/contract.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { ExpenditureService } from '../../../../core/services/expenditure.service';

import { Expenditure } from '../../../../core/models/expenditures-model/expenditure.model';
import { ExpenditureSummary } from '../../../../core/models/expenditures-model/expenditure-summary.model';
import { ExpenditureFilter } from '../../../../core/models/expenditures-model/expenditure-filter.model';

import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog';
import { ExpenditureActionsRenderer } from '../../../../shared/components/expenditure-actions-renderer/expenditure-actions-renderer';

import { ExpenditureToolbarComponent } from '../../components/expenditure-toolbar/expenditure-toolbar';
import { ExpenditureSummaryCardsComponent } from '../../components/expenditure-summary-cards/expenditure-summary-cards';
import { ExpenditureFilterComponent } from '../../components/expenditure-filter/expenditure-filter';

@Component({
  selector: 'app-expenditure-list',
  standalone: true,
  imports: [
    AgGridAngular,
    MatButtonModule,
    MatIconModule,

    ExpenditureToolbarComponent,
    ExpenditureSummaryCardsComponent,
    ExpenditureFilterComponent
  ],
  templateUrl: './expenditure-list.html',
  styleUrl: './expenditure-list.scss'
})
export class ExpenditureListComponent implements OnInit {

  private expenditureService = inject(ExpenditureService);

  private vendorService = inject(VendorService);

  private contractService = inject(ContractService);

  private dialog = inject(MatDialog);

  private router = inject(Router);

  private snackbar = inject(SnackbarService);

  gridApi!: GridApi;

  context = {
    componentParent: this
  };

  getRowId = (params: any) =>
    params.data.id.toString();

  rowData: Expenditure[] = [];

  vendors: Vendor[] = [];

  contracts: Contract[] = [];

  selectedExpenditure: Expenditure | null = null;

  selectedExpenditures: Expenditure[] = [];

  summary: ExpenditureSummary = {

    totalSpend: 0,

    paidAmount: 0,

    pendingAmount: 0,

    forecastAmount: 0,

    budget: 0,

    remainingBudget: 0,

    totalExpenses: 0,

    paidExpenses: 0,

    pendingExpenses: 0,

    overdueExpenses: 0

  };

  filter: ExpenditureFilter = {

    page: 1,

    pageSize: 20,

    sortBy: 'ExpenseDate',

    descending: true

  };

  totalRecords = 0;

  totalPages = 0;

  currentPage = 1;

  pageSize = 20;

  pageSizeOptions = [10, 20, 50, 100];

  columnDefs: ColDef<Expenditure>[] = [

{
    field:'expenseNumber',
    headerName:'Expense No',
    width:170,
    checkboxSelection:true,
    headerCheckboxSelection:true
},

{
    field:'title',
    headerName:'Title',
    flex:1.5
},

{
    field:'vendorName',
    headerName:'Vendor',
    flex:1.3
},

{
    field:'invoiceNumber',
    headerName:'Invoice',
    width:170
},

{
    field:'department',
    headerName:'Department',
    width:150
},

{
    field:'category',
    headerName:'Category',
    width:170
},

{
    field:'amount',
    headerName:'Amount',
    width:150,

    valueFormatter:p=>

        new Intl.NumberFormat(
            'en-IN',
            {
                style:'currency',
                currency:'INR'
            }).format(p.value)
},

{
    field:'totalAmount',
    headerName:'Total',
    width:150,

    valueFormatter:p=>

        new Intl.NumberFormat(
            'en-IN',
            {
                style:'currency',
                currency:'INR'
            }).format(p.value)
},

{
    field:'paymentStatus',
    headerName:'Payment',
    width:150
},

{
    field:'status',
    headerName:'Status',
    width:150
},

{
    field:'expenseDate',
    headerName:'Expense Date',
    width:150,

    valueFormatter:p=>

        new Date(
            p.value
        ).toLocaleDateString()
},

{
    headerName:'Actions',

    width:220,

    sortable:false,

    filter:false,

    cellRenderer:
        ExpenditureActionsRenderer
}

];

ngOnInit(): void {

  this.loadDashboard();

  this.loadVendors();

  this.loadContracts();

  this.loadExpenditures();

}

onGridReady(event: GridReadyEvent): void {

  this.gridApi = event.api;

}

loadDashboard(): void {

  this.expenditureService
    .getDashboard()
    .subscribe({

      next: dashboard => {

        this.summary = dashboard.summary;

      },

      error: error => {

        console.error(error);

      }

    });

}

loadExpenditures(): void {

  this.expenditureService
    .search(this.filter)
    .subscribe({

      next: (response: Expenditure[]) => {

        this.rowData = [...response];

        this.totalRecords = response.length;

        this.totalPages = 1;

        this.currentPage = 1;

        this.pageSize = this.filter.pageSize;

        if (this.gridApi) {

          this.gridApi.setGridOption(
            'rowData',
            [...response]
          );

          this.gridApi.refreshCells({
            force: true
          });

          this.gridApi.redrawRows();

        }

      },

      error: (error: any) => {

        console.error(error);

      }

    });

}

loadVendors(): void {

  this.vendorService
    .getAll()
    .subscribe({

      next: vendors => {

        this.vendors = vendors;

      },

      error: error => {

        console.error(error);

      }

    });

}

loadContracts(): void {

  this.contractService
    .getAll()
    .subscribe({

      next: contracts => {

        this.contracts = contracts;

      },

      error: error => {

        console.error(error);

      }

    });

}

onSearch(event: Event): void {

  this.filter.keyword =

    (event.target as HTMLInputElement).value;

  this.filter.page = 1;

  this.loadExpenditures();

}

onSortChanged(): void {

  const sortModel =

    this.gridApi
      .getColumnState()
      .find(c => c.sort);

  if (!sortModel) {

    this.filter.sortBy = 'ExpenseDate';

    this.filter.descending = true;

  }
  else {

    this.filter.sortBy =
      sortModel.colId;

    this.filter.descending =
      sortModel.sort === 'desc';

  }

  this.loadExpenditures();

}

previousPage(): void {

  if (this.currentPage <= 1) {

    return;

  }

  this.filter.page--;

  this.loadExpenditures();

}

nextPage(): void {

  if (this.currentPage >= this.totalPages) {

    return;

  }

  this.filter.page++;

  this.loadExpenditures();

}

changePageSize(event: Event): void {

  const size = Number(

    (event.target as HTMLSelectElement).value

  );

  this.filter.pageSize = size;

  this.filter.page = 1;

  this.loadExpenditures();

}

applyFilter(filter: ExpenditureFilter): void {

  this.filter = {
    ...filter,
    page: 1
  };

  this.loadExpenditures();
}

clearFilters(): void {

  this.filter = {
    page: 1,
    pageSize: this.pageSize,
    sortBy: 'ExpenseDate',
    descending: true
  };

  this.loadExpenditures();
}

onSelectionChanged(): void {

  this.selectedExpenditures =
    this.gridApi.getSelectedRows();

  if (this.selectedExpenditures.length === 1) {

    this.selectedExpenditure =
      this.selectedExpenditures[0];

  } else {

    this.selectedExpenditure = null;

  }

}

onRowDoubleClicked(event: any): void {

  this.router.navigate([
    '/expenditures',
    event.data.id
  ]);

}

openAddExpenditure(): void {

  this.router.navigate([
    '/expenditures/add'
  ]);

}

onEditExpenditure(): void {

  if (!this.selectedExpenditure) {

    return;

  }

  this.router.navigate([
    '/expenditures/edit',
    this.selectedExpenditure.id
  ]);

}

deleteExpenditure(id: number): void {

  const dialogRef =
    this.dialog.open(
      ConfirmationDialogComponent,
      {
        width: '420px',
        data: {

          title: 'Delete Expenditure',

          message:
            'Are you sure you want to permanently delete this expenditure?'

        }

      });

  dialogRef.afterClosed()
    .subscribe(result => {

      if (!result) {

        return;

      }

      this.expenditureService
        .delete(id)
        .subscribe({

          next: () => {

            this.loadDashboard();

            this.loadExpenditures();

            this.snackbar.success(
              'Expenditure deleted successfully'
            );

          },

          error: (error: any) => {

            console.error(error);

            this.snackbar.error(
              'Unable to delete expenditure.'
            );

          }

        });

    });

}
refresh(): void {

  this.loadDashboard();

  this.loadExpenditures();

}

exportExcel(): void {

  this.expenditureService
    .exportExcel(this.filter)
    .subscribe({

      next: file => {

        const blob = new Blob(
          [file],
          {
            type:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });

        const url =
          window.URL.createObjectURL(blob);

        const a =
          document.createElement('a');

        a.href = url;

        a.download =
          `ExpenditureReport_${new Date().toISOString()}.xlsx`;

        a.click();

        window.URL.revokeObjectURL(url);

        this.snackbar.success(
          'Excel exported successfully.'
        );

      },

      error: error => {

        console.error(error);

        this.snackbar.error(
          'Export failed.'
        );

      }

    });

}

openDashboard(): void {

  this.router.navigate([
    '/expenditures/dashboard'
  ]);

}

openForecast(): void {

  this.router.navigate([
    '/expenditures/forecast'
  ]);

}

removeSelectedExpenditures(): void {

  if (this.selectedExpenditures.length === 0) {

    return;

  }

  const dialogRef =
    this.dialog.open(
      ConfirmationDialogComponent,
      {
        width: '420px',
        data: {

          title: 'Delete Expenditures',

          message:
            `Delete ${this.selectedExpenditures.length} selected expenditure(s)?`

        }

      });

  dialogRef.afterClosed()
    .subscribe(result => {

      if (!result) {

        return;

      }

      const requests =
        this.selectedExpenditures.map(x =>
          this.expenditureService.delete(x.id)
        );

      forkJoin(requests)
        .subscribe({

          next: () => {

            this.selectedExpenditure = null;

            this.selectedExpenditures = [];

            this.loadDashboard();

            this.loadExpenditures();

            this.snackbar.success(
              'Selected expenditures deleted successfully.'
            );

          },

          error: (error: any) => {

            console.error(error);

          }

        });

    });

}

archiveSelected(): void {

  this.snackbar.success(
    'Archive functionality will be available soon.'
  );

}

openDetails(id: number): void {

  this.router.navigate([
    '/expenditures',
    id
  ]);

}

openEditPage(id: number): void {

  this.router.navigate([
    '/expenditures/edit',
    id
  ]);

}

deleteRow(id: number): void {

  this.deleteExpenditure(id);

}

}