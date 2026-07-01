import { Injectable, inject } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private snackBar =
    inject(MatSnackBar);

  success(message: string): void {

    this.snackBar.open(

      message,

      'Close',

      {

        duration: 3000,

        horizontalPosition: 'right',

        verticalPosition: 'bottom',

        panelClass: ['success-snackbar']

      }

    );

  }

  error(message: string): void {

    this.snackBar.open(

      message,

      'Close',

      {

        duration: 4000,

        horizontalPosition: 'right',

        verticalPosition: 'bottom',

        panelClass: ['error-snackbar']

      }

    );

  }

  warning(message: string): void {

    this.snackBar.open(

      message,

      'Close',

      {

        duration: 3000,

        horizontalPosition: 'right',

        verticalPosition: 'bottom',

        panelClass: ['warning-snackbar']

      }

    );

  }

}