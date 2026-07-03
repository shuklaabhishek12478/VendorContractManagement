import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-contract-button',
  standalone: true,
  imports: [],
  templateUrl: './add-contract-button.html',
  styleUrls: ['./add-contract-button.scss']
})
export class AddContractButtonComponent {

  @Input()
  disabled = false;

  @Output()
  add = new EventEmitter<void>();

  onAdd(): void {
    this.add.emit();
  }

}