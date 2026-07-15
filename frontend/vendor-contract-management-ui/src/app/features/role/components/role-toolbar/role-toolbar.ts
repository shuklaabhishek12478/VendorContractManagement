import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-role-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    
  ],
  templateUrl: './role-toolbar.html',
  styleUrl: './role-toolbar.scss'
})
export class RoleToolbarComponent {

  @Input()
  hasSelection = false;

  @Input()
  isActive = false;

  @Output()
  add = new EventEmitter<void>();

  @Output()
  edit = new EventEmitter<void>();

  @Output()
  delete = new EventEmitter<void>();

  @Output()
  activate = new EventEmitter<void>();

  @Output()
  deactivate = new EventEmitter<void>();

  @Output()
  assignPermissions = new EventEmitter<void>();

  @Output()
  assignUsers = new EventEmitter<void>();

  @Output()
  clone = new EventEmitter<void>();

}