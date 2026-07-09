import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './confirmation-dialog.html',
  styleUrl: './confirmation-dialog.scss'
})
export class ConfirmationDialogComponent {

  data = inject(MAT_DIALOG_DATA);

  private dialogRef =
    inject(MatDialogRef<ConfirmationDialogComponent>);

  cancel(): void {

    this.dialogRef.close(false);

  }

  confirm(): void {

    this.dialogRef.close(true);

  }

}