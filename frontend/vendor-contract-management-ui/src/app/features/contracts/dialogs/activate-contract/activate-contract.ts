import { Component, inject } from '@angular/core';

import {
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-activate-contract',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './activate-contract.html',
  styleUrls: ['./activate-contract.scss']
})
export class ActivateContractComponent {

  private dialogRef =
    inject(MatDialogRef<ActivateContractComponent>);

  activate(): void {

    this.dialogRef.close(true);

  }

  cancel(): void {

    this.dialogRef.close(false);

  }

}