import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { User } from '../../../../../core/models/user.model';

@Component({
  selector: 'app-user-summary-cards',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './user-summary-cards.html',
  styleUrl: './user-summary-cards.scss'
})
export class UserSummaryCardsComponent {

  @Input({ required: true })
  user!: User;

  @Input()
isActive = true;

@Input()
roleCount = 0;

@Input()
vendorName = '';

}