import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-remove-vendor-button',
  standalone: true,
  imports: [],
  templateUrl: './remove-vendor-button.html',
  styleUrl: './remove-vendor-button.scss'
})
export class RemoveVendorButtonComponent {

  @Input()
  disabled = true;

  @Output()
  remove = new EventEmitter<void>();

  onRemove(): void {
    this.remove.emit();
  }

}