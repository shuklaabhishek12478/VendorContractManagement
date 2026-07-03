import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

import { Vendor } from '../../../../core/models/vendor.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-contract-form',
  standalone: true,
  imports: [
  CommonModule,

  ReactiveFormsModule,

  MatFormFieldModule,

  MatInputModule,

  MatSelectModule,

  MatButtonModule,

  MatDatepickerModule,

  MatNativeDateModule

],
  templateUrl: './contract-form.html',
  styleUrls: ['./contract-form.scss']
})
export class ContractFormComponent {

  @Input()
  form!: FormGroup;

  @Input()
  vendors: Vendor[] = [];

  @Input()
  loading = false;

  @Output()
  save = new EventEmitter<void>();

  @Output()
  cancel = new EventEmitter<void>();

  onSave(): void {

    this.save.emit();

  }

  onCancel(): void {

    this.cancel.emit();

  }

}