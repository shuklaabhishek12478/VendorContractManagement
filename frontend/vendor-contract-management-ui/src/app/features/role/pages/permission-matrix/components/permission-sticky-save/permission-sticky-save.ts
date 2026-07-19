import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-permission-sticky-save',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './permission-sticky-save.html',
  styleUrl: './permission-sticky-save.scss'
})
export class PermissionStickySaveComponent {

  @Input() hasChanges = false;

  @Input() saving = false;

  @Input() addedPermissions = 0;

  @Input() removedPermissions = 0;

  @Output() save = new EventEmitter<void>();

  @Output() discard = new EventEmitter<void>();

}