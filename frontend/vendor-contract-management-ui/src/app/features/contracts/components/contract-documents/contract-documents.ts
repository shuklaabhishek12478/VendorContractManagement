import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

import { Document } from '../../../../core/models/document.model';
import { ContractStatus } from '../../../../core/models/contract-status.enum';
import { Contract } from '../../../../core/models/contract.model';
import { AuthService } from '../../../../core/services/auth.service';

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
private authService = inject(AuthService);
  
  @Input({ required: true })
contract!: Contract;

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
  
  trackByDocumentId(index: number, doc: Document): number {
  return doc.id;
}

  canUpload(): boolean {

    if (!this.contract) {

        return false;

    }

    return this.contract.status === ContractStatus.Approved
        || this.contract.status === ContractStatus.Active;

}

canDelete(): boolean {
    return this.authService.isAdmin();
}
}