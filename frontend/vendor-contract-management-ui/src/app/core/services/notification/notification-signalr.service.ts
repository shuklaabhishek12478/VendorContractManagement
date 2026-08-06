import { Injectable } from '@angular/core';

import * as signalR from '@microsoft/signalr';

import { Subject } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { AppNotification } from '../../models/notifications-model/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationSignalRService {

  private hubConnection?: signalR.HubConnection;

  private readonly notificationSubject =
    new Subject<AppNotification>();

  readonly notificationReceived =
    this.notificationSubject.asObservable();

  startConnection(): void {

    if (this.hubConnection) {
      return;
    }

    const hubUrl =
      environment.apiUrl.replace('/api', '') +
      '/hubs/notifications';
const token =
  localStorage.getItem('access_token') ??
  sessionStorage.getItem('access_token') ??
  '';

console.log('Hub URL:', hubUrl);
console.log('SignalR Token:', token);

this.hubConnection =
  new signalR.HubConnectionBuilder()
    .withUrl(hubUrl, {
      accessTokenFactory: () =>
        localStorage.getItem('access_token') ??
        sessionStorage.getItem('access_token') ??
        ''
    })
    .withAutomaticReconnect()
    .build();

    this.registerHubEvents();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => console.error(err));

      this.hubConnection.on(
    'ReceiveNotification',
    (notification) => {

        console.log('LIVE Notification', notification);

        this.notificationSubject.next(notification);
    }
);
  }

  stopConnection(): void {

    this.hubConnection?.stop();

    this.hubConnection = undefined;

  }

  private registerHubEvents(): void {

    if (!this.hubConnection) return;

    this.hubConnection.on(
      'ReceiveNotification',
      (notification: AppNotification) => {
        this.notificationSubject.next(notification);
      }
    );

    this.hubConnection.onreconnecting(err =>
      console.warn(err)
    );

    this.hubConnection.onreconnected(id =>
      console.log(id)
    );

    this.hubConnection.onclose(err =>
      console.warn(err)
    );

  }
}