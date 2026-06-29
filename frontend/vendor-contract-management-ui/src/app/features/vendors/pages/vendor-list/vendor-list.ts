import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Vendor } from '../../../../core/models/vendor.model';
import { OnInit, inject } from '@angular/core';
import { VendorService } from '../../../../core/services/vendor.service';
import { MatDialog } from '@angular/material/dialog';
import { AddVendorDialog } from '../../../../shared/components/add-vendor-dialog/add-vendor-dialog';
import { CreateVendor } from '../../../../core/models/create-vendor.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VendorActionsRenderer } from '../../../../shared/components/vendor-actions-renderer/vendor-actions-renderer';
import { Router } from '@angular/router';
import { VendorToolbarComponent } from '../../../../shared/components/vendor-toolbar/vendor-toolbar';

@Component({
  selector: 'app-vendor-list',
  imports: [AgGridAngular,
  MatIconModule,
  MatButtonModule,
  VendorToolbarComponent],
  templateUrl: './vendor-list.html',
  styleUrl: './vendor-list.scss'
})


export class VendorListComponent implements OnInit{
  private vendorService = inject(VendorService);
  private gridApi!: GridApi;
  private dialog = inject(MatDialog);
  private router = inject(Router);

   context = {
    componentParent: this
  };


  getRowId = (params: any) =>
    params.data.id.toString();


  ngOnInit(): void {
  this.loadVendors();

   
   
}

onGridReady(params: GridReadyEvent): void {
  this.gridApi = params.api;
}

onSearch(event: Event): void {
  const value = (event.target as HTMLInputElement).value;

  this.gridApi.setGridOption(
    'quickFilterText',
    value
  );
}
  columnDefs: ColDef<Vendor>[] = [
  {
  field: 'id',
  headerName: 'ID',
  width: 100,
  checkboxSelection: true,
  headerCheckboxSelection: true,
  
},
  {
    field: 'vendorName',
    headerName: 'Vendor'
  },
  {
    field: 'companyName',
    headerName: 'Company'
  },
  {
    field: 'email',
    headerName: 'Email'
  },
  {
    field: 'phone',
    headerName: 'Phone'
  },
  {
  field: 'isActive',
  headerName: 'Status',
  cellRenderer: (params: any) => {
    return params.value
      ? '🟢 Active'
      : '🔴 Inactive';
  }
},
{
  headerName: 'Actions',
  width: 300,
  cellRenderer: VendorActionsRenderer
}
];

  rowData: Vendor[] = [
    
  ];

  selectedVendor: Vendor | null = null;

selectedVendors: Vendor[] = [];


loadVendors(): void {

  this.vendorService
    .getPaged(1, 20)
    .subscribe({

 next: (response) => {

  console.log('API RESPONSE');

  console.table(response.data);

  this.rowData = [...response.data];

  if (this.gridApi) {

    this.gridApi.setGridOption(
      'rowData',
      [...response.data]
    );

    this.gridApi.refreshCells({
      force: true
    });

    this.gridApi.redrawRows();
  }
},

      error: (error) => {

        console.error(error);
      }
    });
}


openAddVendorDialog(): void {

  const dialogRef =
    this.dialog.open(
      AddVendorDialog,
      {
        width: '800px'
      }
    );

  dialogRef.afterClosed()
    .subscribe(result => {

      if (!result) {
        return;
      }

      this.vendorService
  .createVendor(result)
  .subscribe({

    next: (response) => {

  console.log('Reloaded Vendors', response);

  this.rowData = [...response.data];

  console.log('Current Row Data', this.rowData);

  if (this.gridApi) {

    this.gridApi.setGridOption(
      'rowData',
      [...response.data]
    );

    this.gridApi.refreshCells({
      force: true
    });
  }

      setTimeout(() => {
    this.loadVendors();
  }, 500);


      alert(
        'Vendor created successfully'
      );
    },

    error: (error) => {

      console.error(error);
    }
  });
    });
}


openEditVendorDialog(
  vendor: Vendor
): void {

  const dialogRef =
    this.dialog.open(
      AddVendorDialog,
      {
        width: '800px',
        data: vendor
      }
    );

  dialogRef.afterClosed()
    .subscribe(result => {

      if (!result) {
        return;
      }

      this.vendorService
        .updateVendor(
          vendor.id,
          result
        )
        .subscribe({

          next: () => {

            console.log('UPDATE SUCCESS');
             this.loadVendors();

             setTimeout(() => {

    console.log('ROW DATA AFTER RELOAD');

    console.log(this.rowData);

  }, 1000);


            alert(
              'Vendor updated successfully'
            );

           
          },

          error: (error) => {

            console.error(error);
          }
        });
    });
}

deleteVendor(id: number): void {

  const confirmed = confirm(
    'Are you sure you want to delete this vendor?'
  );

  if (!confirmed) {
    return;
  }

  this.vendorService
    .deleteVendor(id)
    .subscribe({

      next: () => {

        alert('Vendor deleted successfully');

        this.loadVendors();
      },

      error: (error) => {

        console.error(error);
      }
    });
}



activateVendor(id: number): void {

  this.vendorService
    .activateVendor(id)
    .subscribe({

      next: () => {

        this.loadVendors();
      },

      error: (error) => {

        console.error(error);
      }
    });
}

deactivateVendor(id: number): void {

  this.vendorService
    .deactivateVendor(id)
    .subscribe({

      next: () => {

        this.loadVendors();
      },

      error: (error) => {

        console.error(error);
      }
    });
}


onRowDoubleClicked(event: any): void {

  console.log(event.data);

  this.router.navigate([
    '/vendors',
    event.data.id
  ]);
}


onSelectionChanged(): void {

  this.selectedVendors =
    this.gridApi.getSelectedRows();

  if (this.selectedVendors.length === 1) {

    this.selectedVendor =
      this.selectedVendors[0];

  } else {

    this.selectedVendor = null;
  }
}


onEditVendor(): void {

  if (!this.selectedVendor) {
    return;
  }

  this.openEditVendorDialog(this.selectedVendor);

}


archiveSelectedVendors(): void {

  console.log(this.selectedVendors);

  alert('Archive functionality coming next.');

}

removeSelectedVendors(): void {

  console.log(this.selectedVendors);

  alert('Remove functionality coming next.');

}

}