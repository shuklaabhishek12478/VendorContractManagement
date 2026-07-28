import { NotificationType } from './notification-type.enum';

export interface AppNotification {

  id: number;

  userId?: number | null;

  module: string;

  type: NotificationType;

  title: string;

  message: string;

  actionUrl?: string | null;

  entityId?: number | null;

  isRead: boolean;

  createdOn: string;

}


