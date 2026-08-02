import {
  Component,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-idle-timeout-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './idle-timeout-dialog.html',
  styleUrls: ['./idle-timeout-dialog.scss']
})
export class IdleTimeoutDialogComponent
implements OnInit, OnDestroy {

  seconds = 60;

  progress = 100;

  private subscription?: Subscription;

  constructor(

    @Inject(MAT_DIALOG_DATA)
    public data: any,

    private dialogRef:
      MatDialogRef<IdleTimeoutDialogComponent>

  ) {}

  ngOnInit(): void {

    this.seconds = this.data.countdown;

    this.progress = 100;

    this.subscription =
      interval(1000)
      .subscribe(() => {

        this.seconds--;

        this.progress =
          (this.seconds / this.data.countdown) * 100;

        if (this.seconds <= 0) {

          this.subscription?.unsubscribe();

          this.dialogRef.close('logout');

        }

      });

  }

  continueSession(): void {

    this.subscription?.unsubscribe();

    this.dialogRef.close('continue');

  }

  logout(): void {

    this.subscription?.unsubscribe();

    this.dialogRef.close('logout');

  }

  ngOnDestroy(): void {

    this.subscription?.unsubscribe();

  }

}