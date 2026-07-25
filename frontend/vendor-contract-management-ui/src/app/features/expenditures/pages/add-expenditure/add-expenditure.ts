import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { VendorService } from '../../../../core/services/vendor.service';
import { ContractService } from '../../../../core/services/contract.service';
import { ExpenditureService } from '../../../../core/services/expenditure.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';

import { Vendor } from '../../../../core/models/vendor.model';
import { Contract } from '../../../../core/models/contract.model';
import { CreateExpenditure } from '../../../../core/models/expenditures-model/create-expenditure.model';

import { Department } from '../../../../core/models/expenditures-model/expenditure-enum/department.enum';
import { CostCenter } from '../../../../core/models/expenditures-model/expenditure-enum/cost-center.enum';
import { ExpenseCategory } from '../../../../core/models/expenditures-model/expenditure-enum/expense-category.enum';
import { ExpenseType } from '../../../../core/models/expenditures-model/expenditure-enum/expense-type.enum';
import { PaymentMethod } from '../../../../core/models/payment-method.enum';
import { PaymentStatus } from '../../../../core/models/expenditures-model/expenditure-enum/payment-status.enum';
import { MatCardModule } from '@angular/material/card';
import { ExpenditureFormComponent } from '../../components/expenditure-form/expenditure-form';
import { Currency } from '../../../../core/models/currency.enum';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-expenditure',
  standalone: true,
  imports: [
   CommonModule,

  ReactiveFormsModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  ExpenditureFormComponent
  ],
  templateUrl: './add-expenditure.html',
  styleUrl: './add-expenditure.scss'
})
export class AddExpenditureComponent implements OnInit {

  @ViewChild(ExpenditureFormComponent)
formComponent!: ExpenditureFormComponent;

loading = false;

  private expenditureService = inject(ExpenditureService);

  private snackbar = inject(SnackbarService);

  private router = inject(Router);



  vendors: Vendor[] = [];

  contracts: Contract[] = [];

 model: CreateExpenditure = {

  title: '',

  description: '',

  vendorId: 0,

  contractId: undefined,

  expenseDate: new Date().toISOString(),

  amount: 0,

  expenseType: ExpenseType.OPEX,

  category: ExpenseCategory.Software,

  department: Department.IT,

  costCenter: CostCenter.ITInfrastructure,

  paymentMethod: PaymentMethod.NEFT,

  paymentStatus: PaymentStatus.Pending,

  currency: Currency.INR,

  taxPercentage: 18,

  invoiceNumber: '',

  purchaseOrderNumber: '',

  invoiceDate: '',

  dueDate: '',

  remarks: '',

  isRecurring: false,

  recurringMonths: undefined,

  isForecasted: false

};

  ngOnInit(): void {

    

  }

save(): void {

  if (!this.formComponent.isValid()) {

    this.formComponent.markAllAsTouched();

    return;

  }

  this.loading = true;

  const model =
    this.formComponent.getCreateModel();

  this.expenditureService
    .create(model)
    .subscribe({

      next: () => {

        this.loading = false;

        this.snackbar.success(
          'Expenditure created successfully.'
        );

        this.router.navigate([
          '/expenditures'
        ]);

      },

      error: error => {

        this.loading = false;

        console.error(error);

      }

    });

}

  cancel(){

    this.router.navigate([
      '/expenditures'
    ]);

  }

}