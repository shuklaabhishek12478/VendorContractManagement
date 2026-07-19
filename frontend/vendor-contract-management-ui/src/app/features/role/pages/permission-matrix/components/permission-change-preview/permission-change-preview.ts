import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-permission-change-preview',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './permission-change-preview.html',
  styleUrl: './permission-change-preview.scss'
})
export class PermissionChangePreviewComponent {

  @Input() hasChanges = false;

  @Input() addedPermissionNames: string[] = [];

  @Input() removedPermissionNames: string[] = [];

}