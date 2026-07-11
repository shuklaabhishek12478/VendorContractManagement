import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';

import {
  DomSanitizer,
  SafeResourceUrl
} from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-document-preview-dialog',
  standalone: true,
  imports: [
    CommonModule,
MatDialogModule,
MatIconModule,
MatButtonModule
  ],
  templateUrl: './document-preview-dialog.html'
})
export class DocumentPreviewDialogComponent {

  data = inject(MAT_DIALOG_DATA);

  previewUrl: SafeResourceUrl;

constructor(private sanitizer: DomSanitizer) {

  this.previewUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl(
      this.data.url
    );

}

}