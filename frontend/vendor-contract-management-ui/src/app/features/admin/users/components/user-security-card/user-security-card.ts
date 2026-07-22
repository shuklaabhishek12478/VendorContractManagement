import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { User } from '../../../../../core/models/user.model';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-security-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './user-security-card.html',
  styleUrl: './user-security-card.scss'
})
export class UserSecurityCardComponent {

  @Input({ required: true })
  user!: User;

  @Output()
  activate = new EventEmitter<void>();

  @Output()
  deactivate = new EventEmitter<void>();

  @Output()
  resetPassword = new EventEmitter<void>();

}