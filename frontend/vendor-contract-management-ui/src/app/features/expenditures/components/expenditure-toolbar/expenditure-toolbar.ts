import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Expenditure } from '../../../../core/models/expenditures-model/expenditure.model';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';

@Component({
  selector: 'app-expenditure-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    HasPermissionDirective
  ],
  templateUrl: './expenditure-toolbar.html',
  styleUrl: './expenditure-toolbar.scss'
})
export class ExpenditureToolbarComponent {

  @Input() selectedExpenditure: Expenditure | null = null;

  @Input() selectedExpenditures: Expenditure[] = [];
  

  @Output() add = new EventEmitter<void>();

  @Output() edit = new EventEmitter<void>();

  @Output() remove = new EventEmitter<void>();

  @Output() export = new EventEmitter<void>();

  @Output() refresh = new EventEmitter<void>();

  @Output() dashboard = new EventEmitter<void>();

  @Output() forecast = new EventEmitter<void>();

}