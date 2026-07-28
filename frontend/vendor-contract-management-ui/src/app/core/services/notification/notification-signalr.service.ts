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

    this.hubConnection =
      new signalR.HubConnectionBuilder()

        .withUrl(
          `${environment.apiUrl}/hubs/notifications`,
          {
            accessTokenFactory: () =>
              localStorage.getItem('token') ?? ''
          })

        .withAutomaticReconnect([0, 2000, 5000, 10000])

        .build();

    this.registerHubEvents();

    this.hubConnection
      .start()
      .then(() => {

        console.log(
          'SignalR Connected.'
        );

      })
      .catch(error => {

        console.error(
          'SignalR Connection Error',
          error
        );

      });

  }

  stopConnection(): void {

    if (!this.hubConnection)
      return;

    this.hubConnection.stop();

    this.hubConnection = undefined;

  }

  private registerHubEvents(): void {

    if (!this.hubConnection)
      return;

    this.hubConnection.on(

      'ReceiveNotification',

      (notification: AppNotification) => {

        this.notificationSubject.next(
          notification
        );

      });

    this.hubConnection.onreconnecting(error => {

      console.warn(
        'SignalR reconnecting...',
        error
      );

    });

    this.hubConnection.onreconnected(id => {

      console.log(
        'SignalR reconnected',
        id
      );

    });

    this.hubConnection.onclose(error => {

      console.warn(
        'SignalR closed',
        error
      );

    });

  }

}