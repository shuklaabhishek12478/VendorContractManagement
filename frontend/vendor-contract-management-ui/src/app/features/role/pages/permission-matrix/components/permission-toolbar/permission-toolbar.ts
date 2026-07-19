import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-permission-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './permission-toolbar.html',
  styleUrl: './permission-toolbar.scss'
})
export class PermissionToolbarComponent {

  @Input() search = '';

  @Input() selectedModule = '';

  @Input() modules: string[] = [];

  @Output() searchChange =
    new EventEmitter<string>();

  @Output() moduleChange =
    new EventEmitter<string>();

  @Output() selectAll =
    new EventEmitter<void>();

  @Output() clearAll =
    new EventEmitter<void>();

  @Output() expandAll =
    new EventEmitter<void>();

  @Output() collapseAll =
    new EventEmitter<void>();

}