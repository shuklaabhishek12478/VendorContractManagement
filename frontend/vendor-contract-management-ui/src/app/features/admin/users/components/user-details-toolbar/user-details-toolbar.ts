import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-details-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-details-toolbar.html',
  styleUrl: './user-details-toolbar.scss'
})
export class UserDetailsToolbarComponent {

  @Input()
  userId = 0;

  @Input()
  isActive = true;

   @Input()
  canEdit = false;

  @Input()
  canActivate = false;

  @Input()
  canDeactivate = false;

  @Input()
  canResetPassword = false;

  @Input()
  canDelete = false;

  @Output()
  activate = new EventEmitter<void>();

  @Output()
  deactivate = new EventEmitter<void>();

  @Output()
  resetPassword = new EventEmitter<void>();

  @Output()
  delete = new EventEmitter<void>();


   
/*goToResetPassword(): void {

  this.router.navigate([
    '/users/reset-password',
    this.userId
  ]);

}*/

}