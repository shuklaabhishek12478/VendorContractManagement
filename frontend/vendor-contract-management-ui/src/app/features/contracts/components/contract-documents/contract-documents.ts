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
import { FileSizePipe } from '../../../../shared/pipes/file-size-pipe';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-contract-documents',
  standalone: true,
  imports: [
    CommonModule,
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule,
  FileSizePipe
  ],
  templateUrl: './contract-documents.html',
  styleUrls: ['./contract-documents.scss']
})
export class ContractDocumentsComponent {
private authService = inject(AuthService);
 
isDragging = false;
  @Input({ required: true })
contract!: Contract;

  @Input()
  documents: Document[] = [];

  @Input()
  loading = false;

  //@Output()
 // upload = new EventEmitter<void>();

 @Output()
upload = new EventEmitter<File | null>();

  @Output()
  download = new EventEmitter<number>();

  @Output()
  delete = new EventEmitter<number>();
  
  @Output()
preview = new EventEmitter<number>();

  @Input() uploading = false;

  @Input() uploadProgress = 0;

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

getFileIcon(contentType: string): string {

    if (!contentType) {

        return 'insert_drive_file';

    }

    if (contentType.includes('pdf')) {

        return 'picture_as_pdf';

    }

    if (
        contentType.includes('word') ||
        contentType.includes('officedocument')
    ) {

        return 'description';

    }

    if (contentType.includes('image')) {

        return 'image';

    }

    return 'insert_drive_file';

}

onDragOver(event: DragEvent): void {

  event.preventDefault();

  this.isDragging = true;

}

onDragLeave(event: DragEvent): void {

  event.preventDefault();

  this.isDragging = false;

}

onDrop(event: DragEvent): void {

    event.preventDefault();

    this.isDragging = false;

    const files = event.dataTransfer?.files;

    if (!files || files.length === 0) {

        return;

    }

    this.upload.emit(files[0]);

}

formatFileSize(bytes: number): string {

    if (bytes < 1024) {

        return bytes + ' B';

    }

    if (bytes < 1024 * 1024) {

        return (bytes / 1024).toFixed(1) + ' KB';

    }

    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';

}
}