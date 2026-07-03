import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-contract-button',
  standalone: true,
  imports: [],
  templateUrl: './edit-contract-button.html',
  styleUrls: ['./edit-contract-button.scss']
})
export class EditContractButtonComponent {

  @Input()
  disabled = false;

  @Output()
  edit = new EventEmitter<void>();

  onEdit(): void {
    this.edit.emit();
  }

}