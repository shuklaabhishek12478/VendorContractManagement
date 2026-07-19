import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-permission-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './permission-footer.html',
  styleUrl: './permission-footer.scss'
})
export class PermissionFooterComponent {

  @Input() saving = false;

  @Output() save = new EventEmitter<void>();

  @Output() discard = new EventEmitter<void>();

}