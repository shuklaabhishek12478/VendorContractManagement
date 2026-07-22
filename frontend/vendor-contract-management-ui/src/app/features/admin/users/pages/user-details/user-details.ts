import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { User } from '../../../../../core/models/user.model';
import { UserService } from '../../../../../core/services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecentActivity } from '../../../../../core/models/recent-activity.model';
import { UserDetailsToolbarComponent } from '../../components/user-details-toolbar/user-details-toolbar';
import { UserProfileCardComponent } from '../../components/user-profile-card/user-profile-card';
import { UserSummaryCardsComponent } from '../../components/user-summary-cards/user-summary-cards';
import { UserGeneralInfoComponent } from '../../components/user-general-info/user-general-info';
import { UserRoleCardComponent } from '../../components/user-role-card/user-role-card';
import { UserSecurityCardComponent } from '../../components/user-security-card/user-security-card';
import { UserRecentActivityComponent } from '../../components/user-recent-activity/user-recent-activity';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [

  CommonModule,
  RouterModule,

  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatChipsModule,

  UserProfileCardComponent,
  UserSummaryCardsComponent,
  UserGeneralInfoComponent,
  UserRoleCardComponent,
  UserSecurityCardComponent,
  UserRecentActivityComponent,
  UserDetailsToolbarComponent
  ],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss'
})
export class UserDetailsComponent implements OnInit {

  user?: User;
  loading = false;

  activities: RecentActivity[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadUser(id);
    this.loadActivities();

  }

  loadUser(id: number): void {

    this.loading = true;

    this.userService
      .getById(id)
      .subscribe({

        next: user => {
           console.log('User Loaded');
          this.user = user;
          this.loadActivities();
          this.loading = false;

          this.cdr.detectChanges();

        },

        error: () => {

          this.loading = false;

        }

      });

  }

  edit(): void {

    if (!this.user) return;

    this.router.navigate([
      '/users/edit',
      this.user.id
    ]);

  }


activate(): void {

  if (!this.user)
    return;

  this.userService
    .activate(this.user.id)
    .subscribe({

      next: () => {

        this.snackBar.open(
          'User activated successfully.',
          'Close',
          {
            duration: 3000
          });

        this.loadUser(this.user!.id);

      },

      error: (err) => {

        console.error(err);

        this.snackBar.open(
          'Unable to activate user.',
          'Close',
          {
            duration: 3000
          });

      }

    });

}

deactivate(): void {

  if (!this.user)
    return;

  this.userService
    .deactivate(this.user.id)
    .subscribe({

      next: () => {

        this.snackBar.open(
          'User deactivated successfully.',
          'Close',
          {
            duration: 3000
          });

        this.loadUser(this.user!.id);

      },

      error: (err) => {

        console.error(err);

        this.snackBar.open(
          'Unable to deactivate user.',
          'Close',
          {
            duration: 3000
          });

      }

    });

}

resetPassword(): void {

  if (!this.user)
    return;

  const password =
    prompt('Enter new password');

  if (!password)
    return;

  this.userService
    .resetPassword(
      this.user.id,
      password
    )
    .subscribe({

      next: () => {

        this.snackBar.open(
          'Password reset successfully.',
          'Close',
          {
            duration: 3000
          });

      }
      

    });
this.cdr.detectChanges();
}

deleteUser(): void {

  if (!this.user)
    return;

  if (!confirm('Delete this user?'))
    return;

  this.userService
    .delete(this.user.id)
    .subscribe({

      next: () => {

        this.snackBar.open(
          'User deleted successfully.',
          'Close',
          {
            duration: 3000
          });

        this.router.navigate([
          '/users'
        ]);

      }

    });
this.cdr.detectChanges();
}

loadActivities(): void {

  if (!this.user)
    return;

  this.userService
    .getUserActivities(this.user.id)
    .subscribe({

      next: data => {

        this.activities = data;
        this.cdr.detectChanges();

      }

    });

}


}

