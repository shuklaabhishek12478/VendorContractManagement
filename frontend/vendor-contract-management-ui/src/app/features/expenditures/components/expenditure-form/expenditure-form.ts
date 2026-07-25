import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';

import { Vendor } from '../../../../core/models/vendor.model';
import { Contract } from '../../../../core/models/contract.model';

import { VendorService } from '../../../../core/services/vendor.service';
import { ContractService } from '../../../../core/services/contract.service';

import { CreateExpenditure } from '../../../../core/models/expenditures-model/create-expenditure.model';
import { UpdateExpenditure } from '../../../../core/models/expenditures-model/update-expenditure.model';
import { Expenditure } from '../../../../core/models/expenditures-model/expenditure.model';

import { Department } from '../../../../core/models/expenditures-model/expenditure-enum/department.enum';
import { CostCenter } from '../../../../core/models/expenditures-model/expenditure-enum/cost-center.enum';
import { ExpenseCategory } from '../../../../core/models/expenditures-model/expenditure-enum/expense-category.enum';
import { ExpenseType } from '../../../../core/models/expenditures-model/expenditure-enum/expense-type.enum';
import { Currency } from '../../../../core/models/currency.enum';
import { PaymentMethod } from '../../../../core/models/payment-method.enum';
import { EnumHelper } from '../../../../core/helpers/enum-helper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-expenditure-form',
  standalone: true,
  imports: [
    CommonModule,
  ReactiveFormsModule,

  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatDividerModule,
  MatIconModule
  ],
  templateUrl: './expenditure-form.html',
  styleUrl: './expenditure-form.scss'
})
export class ExpenditureFormComponent implements OnInit {

  private fb = inject(FormBuilder);

  private vendorService = inject(VendorService);

  private contractService = inject(ContractService);

  vendors: Vendor[] = [];

  contracts: Contract[] = [];

   form!: FormGroup;


   readonly departments =
  EnumHelper.toOptions(Department);

readonly costCenters =
  EnumHelper.toOptions(CostCenter);

readonly categories =
  EnumHelper.toOptions(ExpenseCategory);

readonly expenseTypes =
  EnumHelper.toOptions(ExpenseType);

readonly currencies =
  EnumHelper.toOptions(Currency);

readonly paymentMethods =
  EnumHelper.toOptions(PaymentMethod);

  ngOnInit(): void {

    this.buildForm();

    this.loadVendors();

    this.loadContracts();

  }

  private buildForm(): void {

    this.form = this.fb.group({

      title: ['', Validators.required],

      vendorId: [null, Validators.required],

      contractId: [null],

      department: [null, Validators.required],

      costCenter: [null, Validators.required],

      category: [null, Validators.required],

      expenseType: [null, Validators.required],

      expenseDate: [null, Validators.required],

      invoiceNumber: ['', Validators.required],

      purchaseOrderNumber: [''],

      invoiceDate: [null],

      dueDate: [null],

      currency: [Currency.INR, Validators.required],

      amount: [
        0,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      taxPercentage: [
        0,
        [
          Validators.min(0),
          Validators.max(100)
        ]
      ],

      paymentMethod: [null, Validators.required],

      description: ['', Validators.required],

      remarks: [''],

      isRecurring: [false],

      recurringMonths: [null],

      isForecasted: [false]

    });

  }

  private loadVendors(): void {

    this.vendorService
      .getAll()
      .subscribe(v => {

        this.vendors = v;

      });

  }

  private loadContracts(): void {

    this.contractService
      .getAll()
      .subscribe(c => {

        this.contracts = c;

      });

  }

  isValid(): boolean {

    return this.form.valid;

  }

  markAllAsTouched(): void {

    this.form.markAllAsTouched();

  }

  getCreateModel(): CreateExpenditure {

    return this.form.getRawValue();

  }

  getUpdateModel(): UpdateExpenditure {

    return this.form.getRawValue();

  }

  load(expenditure: Expenditure): void {

    this.form.patchValue(expenditure);

  }

  

}