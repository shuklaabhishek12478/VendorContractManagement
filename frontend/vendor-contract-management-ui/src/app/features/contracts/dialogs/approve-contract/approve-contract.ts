import { Component, inject } from '@angular/core';

import {
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';

import {
  MatButtonModule
} from '@angular/material/button';
@Component({
  selector: 'app-approve-contract-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './approve-contract.html',
  styleUrls: ['./approve-contract.scss']
})
export class ApproveContractComponent {

  private dialogRef =
    inject(MatDialogRef<ApproveContractComponent>);

  approve(): void {

    this.dialogRef.close(true);

  }

  cancel(): void {

    this.dialogRef.close(false);

  }

}