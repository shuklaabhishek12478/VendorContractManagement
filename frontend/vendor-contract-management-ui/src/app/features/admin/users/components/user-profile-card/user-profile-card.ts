import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import { User } from '../../../../../core/models/user.model';

@Component({
  selector: 'app-user-profile-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule
  ],
  templateUrl: './user-profile-card.html',
  styleUrl: './user-profile-card.scss'
})
export class UserProfileCardComponent {

  @Input({ required: true })
  user!: User;

}