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

  private readonly router = inject(Router);

  private readonly authService =
    inject(AuthService);
  profileOpened = signal(false);

  search = '';

  fullName = 'Abhishek Shukla';

  email = 'abhishek@example.com';

  role = 'Software Engineer';

  initials = 'A';

  ngOnInit(): void {

    this.loadCurrentUser();

  }

  /**
   * Temporary User
   * Future:
   * AuthService -> Current User API
   */
  private loadCurrentUser(): void {

    // TODO
    // Replace with API call

    this.fullName = 'Abhishek Shukla';

    this.email = 'abhishek@example.com';

    this.role = 'Software Engineer';

    this.initials = this.fullName
      .split(' ')
      .map(x => x.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();

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