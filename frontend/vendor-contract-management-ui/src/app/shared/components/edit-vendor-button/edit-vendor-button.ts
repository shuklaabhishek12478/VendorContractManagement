import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-vendor-button',
  standalone: true,
  imports: [],
  templateUrl: './edit-vendor-button.html',
  styleUrl: './edit-vendor-button.scss',
})
export class EditVendorButtonComponent {

   @Input()
  disabled = true;

  @Output()
  edit = new EventEmitter<void>();

  onEdit(): void {
    this.edit.emit();
  }

}
