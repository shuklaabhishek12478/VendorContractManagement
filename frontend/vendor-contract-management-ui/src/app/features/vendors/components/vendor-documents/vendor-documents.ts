import {
  Component,
  Input,
  OnInit, OnChanges,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

import { MatSnackBar } from '@angular/material/snack-bar';
import { VendorDocument } from '../../../../core/models/vendor-document';
import { VendorService } from '../../../../core/services/vendor.service';
import { MatTableModule } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatTooltipModule } from '@angular/material/tooltip';

import { MatMenuModule } from '@angular/material/menu';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FileSizePipe } from '../../../../shared/pipes/file-size-pipe';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog';
import { DocumentUploadDialogComponent } from '../../../../shared/components/document-upload-dialog/document-upload-dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { DocumentPreviewDialogComponent } from '../../../../shared/components/document-preview-dialog/document-preview-dialog';

@Component({
  selector: 'app-vendor-documents',
  standalone: true,
  imports: [
    CommonModule,

MatCardModule,

MatButtonModule,

MatIconModule,

MatTableModule,

MatProgressBarModule,

MatTooltipModule,

MatMenuModule,

MatProgressSpinnerModule,
MatProgressBarModule,
MatSnackBarModule,
FileSizePipe
  ],
  templateUrl: './vendor-documents.html'
})
export class VendorDocumentsComponent
implements OnInit, OnChanges {

  @Input() vendorId!: number;

  documents: VendorDocument[] = [];

  loading = true;

uploading = false;

uploadProgress = 0;

  constructor(
    private vendorService: VendorService,
    private snackBar: MatSnackBar,
     private dialog: MatDialog,
     private sanitizer: DomSanitizer,
     private cdr: ChangeDetectorRef
  ) {}

  displayedColumns = [
'fileName',
'contentType',
'size',
'uploadedOn',
'actions'
];

  ngOnInit(): void {

     console.log("Vendor Id =", this.vendorId);

  this.loadDocuments();

  }
ngOnChanges(changes: SimpleChanges): void {

  if (changes['vendorId'] && this.vendorId) {

    this.loadDocuments();

  }

}

 loadDocuments(): void {

  console.log("Loading documents for vendor:", this.vendorId);

  this.loading = true;

  this.vendorService
    .getVendorDocuments(this.vendorId)
    .subscribe({

      next: (docs) => {

        console.log("Documents received:", docs);
        console.log("Count:", docs.length);

        this.documents = [...docs];

        this.loading = false;
        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

        this.loading = false;

      }

    });

}



  download(file: VendorDocument) {

  this.vendorService
    .downloadVendorDocument(file.id)
    .subscribe(blob => {

      const url = window.URL.createObjectURL(blob);

      const a = window.document.createElement('a');

      a.href = url;

      a.download = file.originalFileName;

      a.click();

      window.URL.revokeObjectURL(url);

    });

}

  delete(document: VendorDocument): void {

  const dialogRef = this.dialog.open(
    ConfirmationDialogComponent,
    {

      width: '480px',

      maxWidth: '95vw',

      disableClose: true,

      data: {

        title: 'Delete Document',

        message:
          `Are you sure you want to delete "${document.originalFileName}"?`,

        confirmText: 'Delete',

        icon: 'delete_forever',

        color: 'warn'

      }

    });

  dialogRef.afterClosed().subscribe(result => {

    if (!result) {

      return;

    }

    this.vendorService
      .deleteVendorDocument(document.id)
      .subscribe(() => {

        this.snackBar.open(
          'Document deleted successfully',
          'OK',
          {
            duration: 2500
          });

        this.loadDocuments();

      });

  });

}

  get totalFiles(): number {

  return this.documents.length;

}

get totalSize(): string {

  const total = this.documents.reduce(
    (sum, file) => sum + (file.fileSize || 0),
    0
  );

  return this.formatBytes(total);

}

get pdfCount(): number {

  return this.documents.filter(x =>
    x.contentType?.includes('pdf')
  ).length;

}

get imageCount(): number {

  return this.documents.filter(x =>
    x.contentType?.startsWith('image/')
  ).length;

}

public formatBytes(bytes: number): string {

  if (!bytes) {

    return '0 Bytes';

  }

  const units = ['Bytes', 'KB', 'MB', 'GB'];

  let index = 0;

  while (bytes >= 1024 && index < units.length - 1) {

    bytes /= 1024;

    index++;

  }

  return `${bytes.toFixed(1)} ${units[index]}`;

}




openUploadDialog(): void {

  const dialogRef = this.dialog.open(
    DocumentUploadDialogComponent,
    {
      width: '550px',
      data: {
        vendorId: this.vendorId
      }
    });

  dialogRef.afterClosed().subscribe(result => {

    if (result === true) {

      this.loadDocuments();

    }

  });

}

preview(document: VendorDocument): void {

  this.dialog.open(
    DocumentPreviewDialogComponent,
    {
      width: '90vw',
      maxWidth: '1200px',
      data: {

        fileName: document.originalFileName,

        url: this.vendorService.getVendorDocumentPreviewUrl(document.id),

        isImage: document.contentType.startsWith('image')

      }
    });

}

openInNewTab(document: VendorDocument): void {

  const url =
    this.vendorService.getVendorDocumentPreviewUrl(
      document.id
    );

  window.open(
    url,
    '_blank'
  );

}
}