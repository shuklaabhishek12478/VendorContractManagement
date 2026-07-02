
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
    MatSelectModule
  ],

  templateUrl: './contract-list.html',
  styleUrls: ['./contract-list.scss']
})
export class ContractListComponent implements OnInit {

  private contractService = inject(ContractService);
  private router = inject(Router);

  contracts: Contract[] = [];

  totalRecords = 0;

  loading = false;

  private gridApi!: GridApi;

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

      cellStyle: {
       color: '#1976d2',
       cursor: 'pointer',
       textDecoration: 'underline'
      },
      onCellClicked: params => {
        this.viewContract(params.data.id);
      }

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
      width: 170
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

}