import { Injectable, NgZone, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, merge, Subscription, timer } from 'rxjs';

import { AuthService } from './auth.service';
import { IdleTimeoutDialogComponent } from '../components/idle-timeout-dialog/idle-timeout-dialog';

@Injectable({
  providedIn: 'root'
})
export class IdleTimeoutService {
   
  private readonly authService = inject(AuthService);
  private readonly dialog = inject(MatDialog);
  private readonly zone = inject(NgZone);

  // Production values
private readonly idleMinutes = 10;
private readonly warningSeconds = 60;

  
  // private readonly idleMinutes = 1;
  // private readonly warningSeconds = 20;

  private activitySubscription?: Subscription;
  private idleTimer?: Subscription;

  private dialogOpened = false;

  start(): void {

    this.stop();

    this.zone.runOutsideAngular(() => {

      this.activitySubscription = merge(

        fromEvent(document, 'mousemove'),
        fromEvent(document, 'keydown'),
        fromEvent(document, 'click'),
        fromEvent(document, 'scroll')

      ).subscribe(() => {

        this.resetTimer();

      });

    });

    this.resetTimer();

  }

  stop(): void {

    this.activitySubscription?.unsubscribe();

    this.idleTimer?.unsubscribe();

  }

  private resetTimer(): void {

    this.idleTimer?.unsubscribe();

    this.idleTimer = timer(
      this.idleMinutes * 60 * 1000
    ).subscribe(() => {

      this.openWarning();

    });

  }

  private openWarning(): void {

    if (this.dialogOpened)
      return;

    this.dialogOpened = true;

    const dialogRef = this.dialog.open(
      IdleTimeoutDialogComponent,
      {
        disableClose: true,
        width: '450px',
        data: {
          countdown: this.warningSeconds
        }
      });

    dialogRef.afterClosed().subscribe(result => {

      this.dialogOpened = false;

      if (result === 'continue') {

        this.resetTimer();

      }
      else {

        this.authService.logout();

      }

    });

  }

}