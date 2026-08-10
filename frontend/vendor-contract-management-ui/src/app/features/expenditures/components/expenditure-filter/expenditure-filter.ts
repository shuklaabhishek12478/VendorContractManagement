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

interface EnumOption {
  value: number;
  label: string;
}

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
readonly departments: EnumOption[] =
  this.getEnumOptions(Department);

readonly costCenters: EnumOption[] =
  this.getEnumOptions(CostCenter);

readonly categories: EnumOption[] =
  this.getEnumOptions(ExpenseCategory);

readonly expenseTypes: EnumOption[] =
  this.getEnumOptions(ExpenseType);

readonly paymentStatuses: EnumOption[] =
  this.getEnumOptions(PaymentStatus);

readonly statuses: EnumOption[] =
  this.getEnumOptions(ExpenditureStatus);
  applyFilters(): void {

    this.filterChange.emit(this.filter);

  }

  clearFilters(): void {

    this.clear.emit();

  }

  private getEnumOptions(enumObject: any): EnumOption[] {
  return Object.keys(enumObject)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
      value: enumObject[key],
      label: key
    }));
}

}