import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './user-filter.html',
  styleUrl: './user-filter.scss'
})
export class UserFilterComponent {

  search = '';

  status: boolean | null = null;

  role = '';

  @Output()
  searchChanged = new EventEmitter<string>();

  @Output()
  statusChanged = new EventEmitter<boolean | null>();

  @Output()
  roleChanged = new EventEmitter<string>();

  clearFilters(): void {

  this.search = '';

  this.status = null;

  this.role = '';

  this.searchChanged.emit('');

  this.statusChanged.emit(null);

  this.roleChanged.emit('');

}
}