import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenditureFilter } from '../../../../core/models/expenditures-model/expenditure-filter.model';
import { Vendor } from '../../../../core/models/vendor.model';
import { Contract } from '../../../../core/models/contract.model';
import { Department } from '../../../../core/models/expenditures-model/expenditure-enum/department.enum';
import { CostCenter } from '../../../../core/models/expenditures-model/expenditure-enum/cost-center.enum';
import { ExpenseCategory } from '../../../../core/models/expenditures-model/expenditure-enum/expense-category.enum';
import { ExpenseType } from '../../../../core/models/expenditures-model/expenditure-enum/expense-type.enum';
import { PaymentStatus } from '../../../../core/models/expenditures-model/expenditure-enum/payment-status.enum';
import { ExpenditureStatus } from '../../../../core/models/expenditures-model/expenditure-enum/expenditure-status.enum';

@Component({
  selector: 'app-expenditure-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './expenditure-filter.html',
  styleUrl: './expenditure-filter.scss'
})
export class ExpenditureFilterComponent {

  @Input() filter!: ExpenditureFilter;

  @Input() vendors: Vendor[] = [];

  @Input() contracts: Contract[] = [];

  @Output() filterChange =
    new EventEmitter<ExpenditureFilter>();

  @Output() clear =
    new EventEmitter<void>();

  readonly departments = Object.values(Department)
    .filter(v => typeof v === 'number');

  readonly costCenters = Object.values(CostCenter)
    .filter(v => typeof v === 'number');

  readonly categories = Object.values(ExpenseCategory)
    .filter(v => typeof v === 'number');

  readonly expenseTypes = Object.values(ExpenseType)
    .filter(v => typeof v === 'number');

  readonly paymentStatuses = Object.values(PaymentStatus)
    .filter(v => typeof v === 'number');

  readonly statuses = Object.values(ExpenditureStatus)
    .filter(v => typeof v === 'number');

  applyFilters(): void {

    this.filterChange.emit(this.filter);

  }

  clearFilters(): void {

    this.clear.emit();

  }

}