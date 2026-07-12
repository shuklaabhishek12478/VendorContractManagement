import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ContractService } from '../../../../core/services/contract.service';

import { VendorService } from '../../../../core/services/vendor.service';

import { Contract } from '../../../../core/models/contract.model';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Vendor } from '../../../../core/models/vendor.model';
import { ContractFormComponent } from '../../components/contract-form/contract-form';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../../../../core/services/snackbar.service';
@Component({
  selector: 'app-edit-contract',
  standalone: true,
  imports: [  CommonModule,
    ReactiveFormsModule,
    ContractFormComponent],
  templateUrl: './edit-contract.html',
  styleUrls: ['./edit-contract.scss']
})
export class EditContractComponent implements OnInit {

  private route = inject(ActivatedRoute);

  private router = inject(Router);
private cdr = inject(ChangeDetectorRef);
  private contractService = inject(ContractService);
   private snackbar = inject(SnackbarService);
  private vendorService = inject(VendorService);
  form!: FormGroup;

private fb = inject(FormBuilder);
  contract!: Contract;

  vendors: Vendor[] = [];

  loading = false;
  

  ngOnInit(): void {

  this.buildForm();

  const id = Number(
    this.route.snapshot.paramMap.get('id')
  );

  this.loadVendors();

  this.loadContract(id);

}

private buildForm(): void {

  this.form = this.fb.group({
    contractNumber: [{ value: '', disabled: true }],
    title: [
      '',
      Validators.required
    ],

    vendorId: [
      null,
      Validators.required
    ],

    startDate: [
      null,
      Validators.required
    ],

    endDate: [
      null,
      Validators.required
    ],

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

        }

      });

  }

  private loadContract(id: number): void {

    this.loading = true;

    this.contractService

      .getById(id)

      .subscribe({

        next: contract => {

          this.contract = contract;

this.form.patchValue({

 // contractNumber: contract.contractNumber,
 // status: contract.status,
  title:
    contract.title,

  vendorId:
    contract.vendorId,

  startDate:
    contract.startDate,

  endDate:
    contract.endDate,

  contractValue:
    contract.contractValue,

  description:
    contract.description

});

this.form.markAsPristine();
          this.loading = false;
           this.cdr.detectChanges();

        },

        error: err => {

          console.error(err);

          this.loading = false;

        }

      });

  }

  save(): void {

  if (this.form.invalid) {

    this.form.markAllAsTouched();

    return;

  }

  if (!this.form.dirty) {

  this.snackbar.warning(
    'No changes detected.'
  );

  return;

}

  this.loading = true;

  this.contractService
    .updateContract(

      this.contract.id,

      this.form.value

      

    )
    .subscribe({

      next: () => {

  this.loading = false;

  this.form.markAsPristine();

  this.snackbar.success(
    'Contract updated successfully.'
  );

  this.router.navigate([
    '/contracts',
    this.contract.id
  ]);

},

      error: (err:any)=>{

  console.error(err);

  this.loading=false;

  this.snackbar.error(
    err.error?.message ??
    'Unable to update contract.'
  );

}

    });

}

  cancel(): void {

  if (this.form.dirty) {

    const ok = confirm(
      'You have unsaved changes. Discard them?'
    );

    if (!ok) {
      return;
    }

  }

  this.router.navigate([
    '/contracts',
    this.contract.id
  ]);

}


  canDeactivate(): boolean {

  if (!this.form.dirty) {

    return true;

  }

  return confirm(
    'You have unsaved changes. Do you really want to leave?'
  );

}

}