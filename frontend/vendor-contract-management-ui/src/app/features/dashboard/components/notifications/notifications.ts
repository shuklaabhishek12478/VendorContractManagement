import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNotification } from '../../../../core/models/notifications-model/notification.model';
import { NotificationType } from '../../../../core/models/notifications-model/notification-type.enum';



@Component({
  selector:'app-notifications',
  standalone:true,
  imports:[
    CommonModule
  ],
  templateUrl:'./notifications.html',
  styleUrls:['./notifications.scss']
})
export class NotificationsComponent {

  @Input()
notifications: AppNotification[] = [];

getCssClass(type: NotificationType): string {

  switch (type) {

    case NotificationType.Success:
      return 'success';

    case NotificationType.Warning:
    case NotificationType.Reminder:
      return 'warning';

    case NotificationType.Error:
      return 'danger';

    case NotificationType.Info:
    case NotificationType.Approval:
      return 'info';

    default:
      return 'info';

  }

}

getTime(date: string): string {

  return new Date(date).toLocaleString();

}
}