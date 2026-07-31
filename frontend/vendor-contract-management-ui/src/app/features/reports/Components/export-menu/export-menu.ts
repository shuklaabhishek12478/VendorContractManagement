import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-export-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './export-menu.html',
  styleUrls: ['./export-menu.scss']
})
export class ExportMenuComponent {

  @Input()
  loading = false;

  @Input()
  disabled = false;

  @Input()
  showPrint = true;

  @Input()
  showCsv = true;

  @Input()
  showExcel = true;

  @Input()
  showPdf = true;

  @Input()
  showCopy = true;

  @Input()
  showEmail = false;

  @Output()
  excel = new EventEmitter<void>();

  @Output()
  pdf = new EventEmitter<void>();

  @Output()
  csv = new EventEmitter<void>();

  @Output()
  print = new EventEmitter<void>();

  @Output()
  copy = new EventEmitter<void>();

  @Output()
  email = new EventEmitter<void>();

}