import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AgGridAngular
} from 'ag-grid-angular';

import {
  ColDef
} from 'ag-grid-community';

import { Contracts } from '../../../core/models/contracts.model';

@Component({
  selector: 'app-vendor-contracts',
  standalone: true,
  imports: [
    CommonModule,
    AgGridAngular
  ],
  templateUrl: './vendor-contracts.html',
  styleUrl: './vendor-contracts.scss'
})
export class VendorContractsComponent {

  @Input()
  contracts: Contracts[] = [];

  

  columnDefs: ColDef[] = [

  {
    headerName: 'Contract ID',
    field: 'id',
    width: 120
  },

  {
    headerName: 'Description',
    field: 'description',
    flex: 2
  },

  {
    headerName: 'Start Date',
    field: 'startDate',
    flex: 1,
    valueFormatter: params =>
      new Date(params.value).toLocaleDateString()
  },

  {
    headerName: 'End Date',
    field: 'endDate',
    flex: 1,
    valueFormatter: params =>
      new Date(params.value).toLocaleDateString()
  },

  {
    headerName: 'Value',
    field: 'contractValue',
    flex: 1,
    valueFormatter: params =>
      `₹ ${Number(params.value).toLocaleString()}`
  },

  {
    headerName: 'Status',
    field: 'status',
    flex: 1,
    valueFormatter: params => {

      switch (params.value) {

        case 0:
          return 'Draft';

        case 1:
          return 'Pending Approval';

        case 2:
          return 'Active';

        case 3:
          return 'Rejected';

        case 4:
          return 'Expired';

        case 5:
          return 'Terminated';

        default:
          return params.value;

      }

    }
  }

];

  defaultColDef: ColDef = {

    sortable: true,

    filter: true,

    resizable: true

  };

}