import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import {
  Subject,
  takeUntil
} from 'rxjs';

import { AppNotification }
from '../../../../core/models/notifications-model/notification.model';

import { NotificationDropdownComponent }
from '../notification-dropdown/notification-dropdown';

import { NotificationStore }
from '../../../../core/stores/notification.store';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NotificationDropdownComponent
  ],
  templateUrl: './notification-bell.html',
  styleUrls: ['./notification-bell.scss']
})
export class NotificationBellComponent
  implements OnInit, OnDestroy {

  private readonly store =
    inject(NotificationStore);

  private readonly router =
    inject(Router);

  private readonly destroy$ =
    new Subject<void>();

  readonly notifications =
    this.store.notifications;

  readonly unreadCount =
    this.store.unreadCount;

  readonly loading =
    this.store.loading;

  opened =
    signal(false);

  animateBell = false;

  ngOnInit(): void {

    this.store.initialize();

    this.store.notificationReceived
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {

        this.animateBell = true;

        setTimeout(() => {

          this.animateBell = false;

        }, 700);

      });

  }

  ngOnDestroy(): void {

    this.destroy$.next();

    this.destroy$.complete();

  }

  toggle(): void {

    this.opened.update(v => !v);

  }

  close(): void {

    this.opened.set(false);

  }

  @HostListener('document:click')
  onDocumentClick(): void {

    this.close();

  }

  stop(event: MouseEvent): void {

    event.stopPropagation();

  }

  markRead(item: AppNotification): void {

    this.store.markRead(item.id);

    if (item.actionUrl) {

      this.router.navigateByUrl(
        item.actionUrl
      );

      this.close();

    }

  }

  markReadById(id: number): void {

    const item =
      this.notifications()
        .find(x => x.id === id);

    if (!item) {

      return;

    }

    this.markRead(item);

  }

  markAllRead(): void {

    this.store.markAllRead();

  }

  openNotification(
    notification: AppNotification
): void {

    this.store.markRead(notification.id);

    this.close();

    if(notification.actionUrl){

        this.router.navigateByUrl(
            notification.actionUrl
        );

    }

}

}