import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-submit-contract',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './submit-contract.html',
  styleUrls: ['./submit-contract.scss']
})
export class SubmitContractComponent {

  private dialogRef =
    inject(MatDialogRef<SubmitContractComponent>);

  data = inject(MAT_DIALOG_DATA);

  submit(): void {

    this.dialogRef.close(true);

  }

  cancel(): void {

    this.dialogRef.close(false);

  }

}