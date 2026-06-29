import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-vendor-button',
  standalone: true,
  imports: [],
  templateUrl: './add-vendor-button.html',
  styleUrl: './add-vendor-button.scss',
})
export class AddVendorButtonComponent {

   @Input()
  disabled = false;

  @Output()
  add = new EventEmitter<void>();

  onAdd(): void {
    this.add.emit();
  }
}
