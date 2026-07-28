import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  AppNotification
} from '../../../../core/models/notifications-model/notification.model';
import { NotificationType } from '../../../../core/models/notifications-model/notification-type.enum';

@Component({
  selector: 'app-notification-item',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './notification-item.html',
  styleUrls: ['./notification-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationItemComponent {

  @Input({ required: true })
  notification!: AppNotification;

  @Output()
  open =
    new EventEmitter<AppNotification>();

  @Output()
  markRead =
    new EventEmitter<number>();

  onClick(): void {

    this.open.emit(this.notification);

  }

  onMarkRead(
    event: MouseEvent
  ): void {

    event.stopPropagation();

    this.markRead.emit(
      this.notification.id
    );

  }

  get icon(): string {

    switch (this.notification.type) {

      case NotificationType.Info:
        return 'fa-circle-info';

      case NotificationType.Success:
        return 'fa-circle-check';

      case NotificationType.Warning:
        return 'fa-triangle-exclamation';

      case NotificationType.Error:
        return 'fa-circle-xmark';

      case NotificationType.Reminder:
        return 'fa-clock';

      case NotificationType.Approval:
        return 'fa-user-check';

      default:
        return 'fa-bell';

    }

  }

  get color(): string {

    switch (this.notification.type) {

      case NotificationType.Info:
        return 'text-sky-500';

      case NotificationType.Success:
        return 'text-green-500';

      case NotificationType.Warning:
        return 'text-yellow-500';

      case NotificationType.Error:
        return 'text-red-500';

      case NotificationType.Reminder:
        return 'text-indigo-500';

      case NotificationType.Approval:
        return 'text-purple-500';

      default:
        return 'text-slate-500';

    }

  }

  get timeAgo(): string {

    const now = Date.now();

    const created =
      new Date(
        this.notification.createdOn
      ).getTime();

    const diff =
      Math.floor(
        (now - created) / 1000
      );

    if (diff < 60)
      return 'Just now';

    const min =
      Math.floor(diff / 60);

    if (min < 60)
      return `${min} min ago`;

    const hr =
      Math.floor(min / 60);

    if (hr < 24)
      return `${hr} hr ago`;

    const day =
      Math.floor(hr / 24);

    if (day < 30)
      return `${day} day ago`;

    const month =
      Math.floor(day / 30);

    if (month < 12)
      return `${month} month ago`;

    return `${Math.floor(month / 12)} year ago`;

  }

}