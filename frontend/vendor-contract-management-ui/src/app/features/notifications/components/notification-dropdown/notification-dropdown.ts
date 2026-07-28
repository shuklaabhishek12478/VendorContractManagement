import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { AppNotification } from '../../../../core/models/notifications-model/notification.model';

import { NotificationItemComponent }
from '../notification-item/notification-item';

@Component({
  selector: 'app-notification-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NotificationItemComponent
  ],
  templateUrl: './notification-dropdown.html',
  styleUrls: ['./notification-dropdown.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationDropdownComponent {
@Input()
notifications: AppNotification[] = [];

@Input()
loading = false;

@Input()
unreadCount = 0;
@Output()
open = new EventEmitter<AppNotification>();
@Output()
markRead = new EventEmitter<number>();

@Output()
markAllRead = new EventEmitter<void>();

@Output()
viewAllClicked = new EventEmitter<void>();
private readonly router = inject(Router);
viewAll(): void {

  this.viewAllClicked.emit();

  this.router.navigate(['/notifications']);

}
}