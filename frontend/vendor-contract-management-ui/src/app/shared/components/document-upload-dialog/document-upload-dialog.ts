import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { VendorService } from '../../../core/services/vendor.service';

@Component({
  selector: 'app-document-upload-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  templateUrl: './document-upload-dialog.html',
  styleUrl: './document-upload-dialog.scss'
})
export class DocumentUploadDialogComponent {
  constructor(
  private snackBar: MatSnackBar,
  private vendorService: VendorService
) {}
  
  
  data = inject(MAT_DIALOG_DATA);

  dialogRef =
    inject(MatDialogRef<DocumentUploadDialogComponent>);

  selectedFile?: File;
  previewUrl?: string;
dragOver = false;
uploading = false;

uploadProgress = 0;

  documentType = '';

  readonly maxFileSize = 10 * 1024 * 1024;

readonly allowedTypes = [

'application/pdf',

'application/msword',

'application/vnd.openxmlformats-officedocument.wordprocessingml.document',

'image/png',

'image/jpeg',

'image/jpg',

'application/vnd.ms-excel',

'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

];

  onFileSelected(event: Event): void {

  const input = event.target as HTMLInputElement;

  if (!input.files?.length) {

    return;

  }

  const file = input.files[0];

  if (!this.validateFile(file)) {

    return;

  }

  this.selectedFile = file;
  this.createPreview(file);

}

 upload(): void {

  if (!this.selectedFile || !this.documentType) {

    return;

  }

  this.uploading = true;

  this.uploadProgress = 0;

  this.vendorService
    .uploadVendorDocument(
      this.data.vendorId,
      this.selectedFile,
      this.documentType
    )
    .subscribe({

      next: (event) => {

        switch (event.type) {

          case HttpEventType.UploadProgress:

            if (event.total) {

              this.uploadProgress = Math.round(
                (100 * event.loaded) / event.total
              );

            }

            break;

          case HttpEventType.Response:

            this.uploadProgress = 100;

            this.snackBar.open(
              'Document uploaded successfully.',
              'OK',
              {
                duration: 2500
              }
            );

            setTimeout(() => {

              this.dialogRef.close(true);

            }, 700);

            break;

        }

      },

      error: () => {

        this.uploading = false;

        this.uploadProgress = 0;

        this.snackBar.open(
          'Upload failed.',
          'OK',
          {
            duration: 3000
          }
        );

      }

    });

}

  private validateFile(file: File): boolean {

  if (!this.allowedTypes.includes(file.type)) {

    this.snackBar.open(

      'Unsupported file type.',

      'OK',

      {

        duration: 3000

      });

    return false;

  }

  if (file.size > this.maxFileSize) {

    this.snackBar.open(

      'Maximum allowed file size is 10 MB.',

      'OK',

      {

        duration: 3000

      });

    return false;

  }

  return true;

}

getFileIcon(file: File): string {

  const type = file.type.toLowerCase();

  if (type.includes('pdf')) {

    return 'picture_as_pdf';

  }

  if (
    type.includes('word') ||
    file.name.endsWith('.doc') ||
    file.name.endsWith('.docx')
  ) {

    return 'description';

  }

  if (
    type.includes('excel') ||
    file.name.endsWith('.xls') ||
    file.name.endsWith('.xlsx')
  ) {

    return 'table_chart';

  }

  if (type.startsWith('image/')) {

    return 'image';

  }

  return 'insert_drive_file';

}

@HostListener('drop', ['$event'])
onDrop(event: DragEvent): void {

  event.preventDefault();

  event.stopPropagation();

  this.dragOver = false;

  if (!event.dataTransfer?.files.length) {

    return;

  }

  const file = event.dataTransfer.files[0];

  if (!this.validateFile(file)) {

    return;

  }

  this.selectedFile = file;
  this.createPreview(file);

}


@HostListener('dragover', ['$event'])
onDragOver(event: DragEvent): void {

  event.preventDefault();

  event.stopPropagation();

  this.dragOver = true;

}

@HostListener('dragleave', ['$event'])
onDragLeave(event: DragEvent): void {

  event.preventDefault();

  event.stopPropagation();

  this.dragOver = false;

}

private createPreview(file: File): void {

  this.previewUrl = undefined;

  if (file.type.startsWith('image/')) {

    const reader = new FileReader();

    reader.onload = () => {

      this.previewUrl = reader.result as string;

    };

    reader.readAsDataURL(file);

  }

}


}