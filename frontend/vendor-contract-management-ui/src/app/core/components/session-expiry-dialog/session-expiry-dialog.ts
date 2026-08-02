import { Component } from '@angular/core';
import {
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-session-expiry-dialog',
  standalone: true,
  imports: [
      CommonModule,
  MatDialogModule,
  MatButtonModule,
  MatIconModule
  ],
  templateUrl: './session-expiry-dialog.html',
  styleUrl: './session-expiry-dialog.scss'
})
export class SessionExpiryDialogComponent {

  constructor(

    private dialogRef:
      MatDialogRef<SessionExpiryDialogComponent>

  ) { }

  continueSession(): void {

    this.dialogRef.close('continue');

  }

  logout(): void {

    this.dialogRef.close('logout');

  }

}