import { ChangeDetectorRef, Component, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { ExpenditureService } from '../../../../core/services/expenditure.service';
import { Expenditure } from '../../../../core/models/expenditures-model/expenditure.model';
import { Department } from '../../../../core/models/expenditures-model/expenditure-enum/department.enum';
import { CostCenter } from '../../../../core/models/expenditures-model/expenditure-enum/cost-center.enum';
import { ExpenseCategory } from '../../../../core/models/expenditures-model/expenditure-enum/expense-category.enum';
import { ExpenseType } from '../../../../core/models/expenditures-model/expenditure-enum/expense-type.enum';
import { PaymentStatus } from '../../../../core/models/expenditures-model/expenditure-enum/payment-status.enum';
import { ExpenditureStatus } from '../../../../core/models/expenditures-model/expenditure-enum/expenditure-status.enum';
import { PaymentMethod } from '../../../../core/models/payment-method.enum';
import { Currency } from '../../../../core/models/currency.enum';

@Component({
  selector: 'app-expenditure-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    HasPermissionDirective
  ],
  templateUrl: './expenditure-details.html',
  styleUrl: './expenditure-details.scss'
})
export class ExpenditureDetailsComponent implements OnInit {

  constructor(
  private cdr: ChangeDetectorRef
) {
}
  private service = inject(ExpenditureService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  loading = true;

  expenditure!: Expenditure;

 private getEnumLabel(
  enumObject: any,
  value: number | string | null | undefined
): string {

  if (value === null || value === undefined || value === '') {
    return '-';
  }

  const numericValue = Number(value);

  const key = Object.keys(enumObject)
    .find(key => enumObject[key] === numericValue);

  return key ?? String(value);
}

getDepartmentLabel(value: number): string {
  return this.getEnumLabel(Department, value);
}

getCostCenterLabel(value: number): string {
  return this.getEnumLabel(CostCenter, value);
}

getCategoryLabel(value: number): string {
  return this.getEnumLabel(ExpenseCategory, value);
}

getExpenseTypeLabel(value: number): string {
  return this.getEnumLabel(ExpenseType, value);
}

getPaymentStatusLabel(value: number): string {
  return this.getEnumLabel(PaymentStatus, value);
}

getStatusLabel(value: number): string {
  return this.getEnumLabel(ExpenditureStatus, value);
}
getPaymentMethodLabel(value: number): string {
  return this.getEnumLabel(PaymentMethod, value);
}
getCurrencyLabel(value: number): string {
  return this.getEnumLabel(Currency, value);
}


  ngOnInit(): void {

    const id =
      Number(this.route.snapshot.paramMap.get('id'));

    this.service
      .getById(id)
      .subscribe({

        next: res => {

           console.log('DETAIL API RESPONSE:', res);
    console.log('RECURRING:', res.recurringMonths);
    console.log('IS RECURRING:', res.isRecurring);


          this.expenditure = res;

          this.loading = false;
          this.cdr.detectChanges();

        },

        error: () => {

          this.router.navigate(['/expenditures']);

        }

      });

  }

  edit(): void {

    this.router.navigate([
      '/expenditures/edit',
      this.expenditure.id
    ]);

  }

  back(): void {

    this.router.navigate([
      '/expenditures'
    ]);

  }

}