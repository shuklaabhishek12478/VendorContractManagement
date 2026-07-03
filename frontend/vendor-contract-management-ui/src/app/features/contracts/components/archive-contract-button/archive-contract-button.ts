import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-archive-contract-button',
  standalone: true,
  imports: [],
  templateUrl: './archive-contract-button.html',
  styleUrls: ['./archive-contract-button.scss']
})
export class ArchiveContractButtonComponent {

  @Input()
  disabled = false;

  @Output()
  archive = new EventEmitter<void>();

  onArchive(): void {
    this.archive.emit();
  }

}