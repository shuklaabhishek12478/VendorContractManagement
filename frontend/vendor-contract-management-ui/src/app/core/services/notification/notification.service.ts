import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { AppNotification } from '../../models/notifications-model/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly http = inject(HttpClient);

  private readonly api =
    `${environment.apiUrl}/Notifications`;

 
  getMyNotifications(): Observable<AppNotification[]> {

    return this.http.get<AppNotification[]>(
      `${this.api}/my`
    );

  }

 
  getDashboardNotifications(): Observable<AppNotification[]> {

    return this.http.get<AppNotification[]>(
      this.api
    );

  }


  getUnreadCount(): Observable<number> {

    return this.http.get<number>(
      `${this.api}/unread-count`
    );

  }

  
  markAsRead(id: number): Observable<void> {

    return this.http.put<void>(
      `${this.api}/read/${id}`,
      {}
    );

  }


  markAllRead(): Observable<void> {

    return this.http.put<void>(
      `${this.api}/read-all`,
      {}
    );

  }

  delete(id: number): Observable<void> {

  return this.http.delete<void>(
    `${this.api}/${id}`
  );

}

clearAll(): Observable<void> {

  return this.http.delete<void>(
    `${this.api}/clear-all`
  );

}

}