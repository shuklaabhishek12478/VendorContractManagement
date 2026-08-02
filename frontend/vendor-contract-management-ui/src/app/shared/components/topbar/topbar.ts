import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { NotificationBellComponent } from '../../../features/notifications/components/notification-bell/notification-bell';
import { LayoutService } from '../../../core/services/layout/layout.service';
import { AuthService } from '../../../core/services/auth.service';
import { SessionService } from '../../../core/services/session.service';
import { IdleTimeoutService } from '../../../core/services/idle-timeout.service';
import { CurrentUser } from '../../../core/models/user-approval-model/current-user.model';

@Component({
  selector: 'app-topbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    NotificationBellComponent
  ],
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.scss']
})
export class Topbar implements OnInit {

  readonly layout = inject(LayoutService);
private sessionService = inject(SessionService);
  private readonly router = inject(Router);
private idleTimeoutService =
inject(IdleTimeoutService);
  private readonly authService =
    inject(AuthService);
  profileOpened = signal(false);

  search = '';

  currentUser?: CurrentUser;

fullName = '';

email = '';

role = '';

initials = '';

  ngOnInit(): void {

    this.loadCurrentUser();

  }

 private loadCurrentUser(): void {

  this.authService
      .getCurrentUser()
      .subscribe({

        next: user => {

          this.currentUser = user;

          this.fullName = user.fullName;

          this.email = user.email;

          this.role = user.role;

          this.initials = user.fullName
            .split(' ')
            .map(x => x.charAt(0))
            .join('')
            .substring(0, 2)
            .toUpperCase();

        },

        error: err => {

          console.error(err);

        }

      });

}
  

  toggleSidebar(): void {

    this.layout.toggleSidebar();

  }

  toggleProfile(): void {

    this.profileOpened.update(x => !x);

  }

  closeProfile(): void {

    this.profileOpened.set(false);

  }

  stop(event: MouseEvent): void {

    event.stopPropagation();

  }

  @HostListener('document:click')

  documentClick(): void {

    this.closeProfile();

  }

  @HostListener('document:keydown.escape')

  escapePressed(): void {

    this.closeProfile();

  }

  @HostListener('window:keydown.control.k', ['$event'])
shortcut(event: Event)
{
const keyboard =
event as KeyboardEvent;

keyboard.preventDefault();

}
  openSearch(event: KeyboardEvent): void {

    event.preventDefault();

    const input =
      document.querySelector<HTMLInputElement>(
        'input[type="text"]'
      );

    input?.focus();

  }


logout(): void {

  this.idleTimeoutService.stop();
     this.sessionService.stop();
    this.authService.logout();

}

canActivate(): boolean {

    if (this.authService.isLoggedIn()) {

        return true;

    }

    this.router.navigate(['/login']);

    return false;

}



}