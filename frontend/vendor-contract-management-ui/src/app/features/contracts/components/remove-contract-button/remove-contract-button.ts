import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-remove-contract-button',
  standalone: true,
  imports: [],
  templateUrl: './remove-contract-button.html',
  styleUrls: ['./remove-contract-button.scss']
})
export class RemoveContractButtonComponent {

  @Input()
  disabled = false;

  @Output()
  remove = new EventEmitter<void>();

  onRemove(): void {
    this.remove.emit();
  }

}