import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

import { Document } from '../../../../core/models/document.model';

@Component({
  selector: 'app-contract-documents',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './contract-documents.html',
  styleUrls: ['./contract-documents.scss']
})
export class ContractDocumentsComponent {

  @Input()
  documents: Document[] = [];

  @Input()
  loading = false;

  @Output()
  upload = new EventEmitter<void>();

  @Output()
  download = new EventEmitter<number>();

  @Output()
  delete = new EventEmitter<number>();

}