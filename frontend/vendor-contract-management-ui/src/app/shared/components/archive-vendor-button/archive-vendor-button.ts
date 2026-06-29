import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-archive-vendor-button',
  standalone: true,
  imports: [],
  templateUrl: './archive-vendor-button.html',
  styleUrl: './archive-vendor-button.scss'
})
export class ArchiveVendorButtonComponent {

  @Input()
  disabled = true;

  @Output()
  archive = new EventEmitter<void>();

  onArchive(): void {
    this.archive.emit();
  }

}