import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  RouterModule,
  MatButtonModule,
  MatIconModule,
  FormsModule,

MatInputModule,

MatFormFieldModule,

MatSelectModule,
  ],
  templateUrl: './user-toolbar.html',
  styleUrl: './user-toolbar.scss'
})
export class UserToolbarComponent {

  @Input()
  selectedUserId = 0;

  @Output()
  edit = new EventEmitter<void>();

  @Output()
  export = new EventEmitter<void>();

  @Output()
  refresh = new EventEmitter<void>();

  @Output()
search = new EventEmitter<string>();

@Output()
statusChanged = new EventEmitter<boolean | null>();

@Output()
roleChanged = new EventEmitter<string>();

@Output()
importUsers = new EventEmitter<File>();
searchText = '';

selectedStatus: boolean | null = null;

selectedRole = '';

onFileSelected(event: Event) {

  const input = event.target as HTMLInputElement;

  if (!input.files?.length)
    return;

  this.importUsers.emit(input.files[0]);

  input.value = '';

}

}