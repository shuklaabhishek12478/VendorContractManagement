import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { SessionService } from './core/services/session.service';
import { IdleTimeoutService } from './core/services/idle-timeout.service';


@Component({
  selector: 'app-root',
   standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
   protected readonly title =
    signal('vendor-contract-management-ui');

  private authService =
    inject(AuthService);

      private sessionService =
    inject(SessionService);

    private idleTimeoutService =
    inject(IdleTimeoutService);

  ngOnInit(): void {

    if (this.authService.isLoggedIn()) {

      this.authService.startRefreshTimer();

      this.sessionService.start();

      this.idleTimeoutService.start();

    }

  }
}
