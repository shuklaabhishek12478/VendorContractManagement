import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-permission-template',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './permission-template.html',
  styleUrl: './permission-template.scss'
})
export class PermissionTemplateComponent {

  @Output() viewer = new EventEmitter<void>();

  @Output() editor = new EventEmitter<void>();

  @Output() manager = new EventEmitter<void>();

  @Output() administrator = new EventEmitter<void>();

  @Output() permissionType =
      new EventEmitter<string>();

}