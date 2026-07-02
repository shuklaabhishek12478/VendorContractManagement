import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { VendorService } from '../../../../core/services/vendor.service';
import { ContractService } from '../../../../core/services/contract.service';

import { Vendor } from '../../../../core/models/vendor.model';
import { CreateContract } from '../../../../core/models/create-contract.model';

@Component({
  selector: 'app-add-contract',
  standalone:true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule
],
  templateUrl: './add-contract.html',
  styleUrls: ['./add-contract.scss']
})
export class AddContractComponent implements OnInit {

  private fb = inject(FormBuilder);
  private vendorService = inject(VendorService);
  private contractService = inject(ContractService);
  private router = inject(Router);

  vendors: Vendor[] = [];

  loading = false;

  form!: FormGroup;

  ngOnInit(): void {

    this.buildForm();

    this.loadVendors();

  }

  private buildForm(): void {

    this.form = this.fb.group({

     // contractNumber: ['', Validators.required],

      title: ['', Validators.required],

      vendorId: [null, Validators.required],

      startDate: [null, Validators.required],

      endDate: [null, Validators.required],

      contractValue: [
        null,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      description: ['']

    });

  }

  private loadVendors(): void {

    this.vendorService
      .getAll()
      .subscribe({

        next: vendors => {

          this.vendors = vendors;

        },

        error: err => {

          console.error(err);

        }

      });

  }

  save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    this.loading = true;

    const contract =
      this.form.value as CreateContract;

    this.contractService
  .createContract(contract)
  .subscribe({
    next: () => {

      this.loading = false;

      this.router.navigate(['/contracts']);

    },

    error: (err: any) => {

      console.error(err);

      this.loading = false;

    }

  });

  }

  cancel(): void {

    this.router.navigate(['/contracts']);

  }

}

 
