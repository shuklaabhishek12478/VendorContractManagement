import { Component, inject } from '@angular/core';

import {
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { VendorFormComponent } from '../vendor-form/vendor-form';

@Component({
  selector: 'app-add-vendor-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    VendorFormComponent
  ],
  templateUrl: './add-vendor-dialog.html',
  styleUrl: './add-vendor-dialog.scss'
})
export class AddVendorDialog {

  private dialogRef =
    inject(MatDialogRef<AddVendorDialog>);

  saveVendor(data: any): void {

    this.dialogRef.close(data);

  }

  close(): void {

    this.dialogRef.close();

  }

}