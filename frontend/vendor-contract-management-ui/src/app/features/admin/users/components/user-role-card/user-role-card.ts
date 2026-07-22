import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-role-card',
  standalone: true,
  imports: [
    CommonModule,
  MatCardModule,
  MatChipsModule,
  MatIconModule,
  MatDividerModule
  ],
  templateUrl: './user-role-card.html',
  styleUrl: './user-role-card.scss'
})
export class UserRoleCardComponent {

  @Input()
  roles: string[] = [];

}