import {
  Injectable,
  computed,
  inject,
  signal
} from '@angular/core';

import {
  finalize,
  Subject
} from 'rxjs';

import {
  AppNotification
} from '../models/notifications-model/notification.model';

import {
  NotificationService
} from '../services/notification/notification.service';

import {
  NotificationSignalRService
} from '../services/notification/notification-signalr.service';

import {
  SnackbarService
} from '../services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationStore {

  private readonly notificationService =
    inject(NotificationService);

  private readonly signalR =
    inject(NotificationSignalRService);

  private readonly snackbar =
    inject(SnackbarService);

  private initialized = false;

  private readonly notificationEvent =
    new Subject<AppNotification>();

  readonly notificationReceived =
    this.notificationEvent.asObservable();

  readonly notifications =
    signal<AppNotification[]>([]);

  readonly loading =
    signal(false);

  readonly unreadCount =
    computed(() =>
      this.notifications()
        .filter(x => !x.isRead)
        .length
    );

  readonly hasUnread =
    computed(() =>
      this.unreadCount() > 0
    );

  readonly totalCount =
    computed(() =>
      this.notifications().length
    );

  initialize(): void {

    if (this.initialized) {
      return;
    }

    this.initialized = true;

    this.load();

    this.signalR.startConnection();

    this.signalR.notificationReceived
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

        this.notificationEvent.next(notification);

      });

  }

  load(): void {

    this.loading.set(true);

    this.notificationService
      .getMyNotifications()
      .pipe(
        finalize(() =>
          this.loading.set(false)
        )
      )
      .subscribe({

        next: data => {

          this.notifications.set(data);

        },

        error: () => {

          this.notifications.set([]);

          this.snackbar.error(
            'Failed to load notifications.'
          );

        }

      });

  }

  refresh(): void {

    this.load();

  }

  markRead(id: number): void {

    const item =
      this.notifications()
        .find(x => x.id === id);

    if (!item || item.isRead) {
      return;
    }

    this.notificationService
      .markAsRead(id)
      .subscribe({

        next: () => {

          item.isRead = true;

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

  delete(id: number): void {

    this.notificationService
      .delete(id)
      .subscribe({

        next: () => {

          this.notifications.update(list =>
            list.filter(x => x.id !== id)
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

  }

  clearAll(): void {

    this.notificationService
      .clearAll()
      .subscribe({

        next: () => {

          this.notifications.set([]);

          this.snackbar.success(
            'All notifications cleared.'
          );

        },

        error: () => {

          this.snackbar.error(
            'Failed to clear notifications.'
          );

        }

      });

  }

}