import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-permission-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './permission-header.html',
  styleUrl: './permission-header.scss'
})
export class PermissionHeaderComponent {

  @Input() saving = false;

  @Output() save = new EventEmitter<void>();
   @Input() roleId!: number;
}