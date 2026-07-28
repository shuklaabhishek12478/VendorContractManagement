import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
  computed
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Subject,
  takeUntil
} from 'rxjs';

import {
  AppNotification
} from '../../../../core/models/notifications-model/notification.model';

import {
  NotificationService
} from '../../../../core/services/notification/notification.service';

import {
  NotificationSignalRService
} from '../../../../core/services/notification/notification-signalr.service';

import {
  NotificationItemComponent
} from '../../components/notification-item/notification-item';

import {
  MatDialog
} from '@angular/material/dialog';

import {
  ConfirmationDialogComponent
} from '../../../../shared/components/confirmation-dialog/confirmation-dialog';

import {
  SnackbarService
} from '../../../../core/services/snackbar.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-notification-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NotificationItemComponent
  ],
  templateUrl: './notification-page.html',
  styleUrl: './notification-page.scss'
})
export class NotificationPageComponent
  implements OnInit, OnDestroy {

  private readonly notificationService =
    inject(NotificationService);

  private readonly signalR =
    inject(NotificationSignalRService);

  private readonly dialog =
    inject(MatDialog);

  private readonly snackbar =
    inject(SnackbarService);

  private readonly destroy$ =
    new Subject<void>();

    private readonly router =
  inject(Router);

  notifications =
    signal<AppNotification[]>([]);

  loading =
    signal(false);

  search =
    signal('');

  unreadOnly =
    signal(false);

  readonly unreadCount =
    computed(() =>
      this.notifications()
        .filter(x => !x.isRead)
        .length
    );

  readonly filteredNotifications =
    computed(() => {

      let data =
        this.notifications();

      if (this.unreadOnly()) {

        data =
          data.filter(x => !x.isRead);

      }

      const keyword =
        this.search()
          .trim()
          .toLowerCase();

      if (!keyword) {

        return data;

      }

      return data.filter(x =>

        x.title
          .toLowerCase()
          .includes(keyword)

        ||

        x.message
          .toLowerCase()
          .includes(keyword)

        ||

        x.module
          .toLowerCase()
          .includes(keyword)

      );

    });


  ngOnInit(): void {

    this.load();

    this.signalR.startConnection();

    this.signalR.notificationReceived
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(notification => {

        const exists =
          this.notifications()
            .some(x => x.id === notification.id);

        if (exists) {

          return;

        }

        this.notifications.update(list => [

          notification,

          ...list

        ]);

      });

  }

  ngOnDestroy(): void {

    this.destroy$.next();

    this.destroy$.complete();

  }

  load(): void {

    this.loading.set(true);

    this.notificationService
      .getMyNotifications()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({

        next: data => {

          this.notifications.set(data);

          this.loading.set(false);

        },

        error: () => {

          this.loading.set(false);

          this.snackbar.error(
            'Failed to load notifications.'
          );

        }

      });

  }

  refresh(): void {

    this.load();

  }

  markRead(
    notification: AppNotification
  ): void {

    if (notification.isRead) {

      return;

    }

    this.notificationService
      .markAsRead(notification.id)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({

        next: () => {

          notification.isRead = true;

          this.notifications.update(list => [...list]);

        },

        error: () => {

          this.snackbar.error(
            'Failed to mark notification as read.'
          );

        }

      });

  }

  markAllRead(): void {

    this.notificationService
      .markAllRead()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({

        next: () => {

          const list =
            this.notifications();

          list.forEach(x => {

            x.isRead = true;

          });

          this.notifications.set([...list]);

          this.snackbar.success(
            'All notifications marked as read.'
          );

        },

        error: () => {

          this.snackbar.error(
            'Failed to update notifications.'
          );

        }

      });

  }

  delete(
    notification: AppNotification
  ): void {

    const dialogRef =
      this.dialog.open(
        ConfirmationDialogComponent,
        {
          width: '430px',
          disableClose: true,
          data: {
            title: 'Delete Notification',
            message: 'Are you sure you want to delete this notification?',
            icon: 'delete',
            confirmText: 'Delete'
          }
        });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(result => {

        if (!result) {

          return;

        }

        this.notificationService
          .delete(notification.id)
          .pipe(
            takeUntil(this.destroy$)
          )
          .subscribe({

            next: () => {

              this.notifications.update(list =>

                list.filter(x =>
                  x.id !== notification.id
                )

              );

              this.snackbar.success(
                'Notification deleted successfully.'
              );

            },

            error: () => {

              this.snackbar.error(
                'Failed to delete notification.'
              );

            }

          });

      });

  }

  clearAll(): void {

    const dialogRef =
      this.dialog.open(
        ConfirmationDialogComponent,
        {
          width: '430px',
          disableClose: true,
          data: {
            title: 'Clear Notifications',
            message: 'This will permanently remove all notifications. Continue?',
            icon: 'delete_sweep',
            confirmText: 'Clear All'
          }
        });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(result => {

        if (!result) {

          return;

        }

        this.notificationService
          .clearAll()
          .pipe(
            takeUntil(this.destroy$)
          )
          .subscribe({

            next: () => {

              this.notifications.set([]);

              this.snackbar.success(
                'All notifications cleared successfully.'
              );

            },

            error: () => {

              this.snackbar.error(
                'Failed to clear notifications.'
              );

            }

          });

      });

  }

  open(notification: AppNotification): void {

  this.markRead(notification);

  if (notification.actionUrl) {

    this.router.navigateByUrl(
      notification.actionUrl
    );

  }

}



}