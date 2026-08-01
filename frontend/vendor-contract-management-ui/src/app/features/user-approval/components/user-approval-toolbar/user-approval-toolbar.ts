import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PendingUser }
from '../../../../core/models/user-approval-model/pending-user.model';

@Component({
  selector: 'app-user-approval-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-approval-toolbar.html',
  styleUrls: ['./user-approval-toolbar.scss']
})
export class UserApprovalToolbarComponent {

  @Input()
  selectedUser?: PendingUser;

  @Output()
  refresh = new EventEmitter<void>();

  @Output()
  view = new EventEmitter<void>();

  @Output()
  approve = new EventEmitter<void>();

  @Output()
  reject = new EventEmitter<void>();

}