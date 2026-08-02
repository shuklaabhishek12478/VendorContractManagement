import { Injectable, inject } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from './auth.service';
import { SessionExpiryDialogComponent } from '../components/session-expiry-dialog/session-expiry-dialog';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private authService = inject(AuthService);
  private dialog = inject(MatDialog);

  private subscription?: Subscription;

  private dialogOpened = false;

  start(): void {

    this.stop();

    this.subscription = interval(30000)
      .subscribe(() => {

        const remaining =
          this.authService.getRemainingTime();

        if (remaining <= 0) {

          this.authService.logout();

          return;

        }

        // 2 minutes remaining

        if (

          remaining <= 30 * 1000 &&

          !this.dialogOpened

        ) {

          this.dialogOpened = true;

          const dialogRef =
            this.dialog.open(
              SessionExpiryDialogComponent,
              {
                disableClose: true,
                width: '420px'
              }
            );

          dialogRef.afterClosed()
            .subscribe(result => {

              this.dialogOpened = false;

              if (result === 'continue') {

                this.authService
                  .refreshToken()
                  .subscribe({

                    next: response => {

                      this.authService.saveTokens(

                        response.accessToken,

                        response.refreshToken,

                        this.authService.isRememberMe()

                      );

                      this.authService.startRefreshTimer();

                    },

                    error: () => {

                      this.authService.logout();

                    }

                  });

              }
              else {

                this.authService.logout();

              }

            });

        }

      });

  }

  stop(): void {

    this.subscription?.unsubscribe();

  }

}