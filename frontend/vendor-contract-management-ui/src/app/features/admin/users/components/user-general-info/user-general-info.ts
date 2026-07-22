import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { User } from '../../../../../core/models/user.model';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-user-general-info',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './user-general-info.html',
  styleUrl: './user-general-info.scss'
})
export class UserGeneralInfoComponent {

  @Input({ required: true })
  user!: User;

}