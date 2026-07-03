import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ContractService } from '../../../../core/services/contract.service';
import { Contract } from '../../../../core/models/contract.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { VendorService } from '../../../../core/services/vendor.service';
import { Vendor } from '../../../../core/models/vendor.model';
import { ContractGeneralInfoComponent } from '../../contract-general-info/contract-general-info';
import { ContractStatusInfoComponent } from '../../contract-status-info/contract-status-info';
import { ContractLifecycleInfoComponent } from '../../contract-lifecycle-info/contract-lifecycle-info';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-contract-details',
  standalone:true,
  imports: [
  CommonModule,
  MatCardModule,
  MatButtonModule,
  ContractGeneralInfoComponent,
  ContractStatusInfoComponent,
  ContractLifecycleInfoComponent
],
  templateUrl: './contract-details.html',
  styleUrls: ['./contract-details.scss']
})
export class ContractDetailsComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private contractService = inject(ContractService);
  private vendorService = inject(VendorService);
  private cdr = inject(ChangeDetectorRef);

 

  contract!: Contract;
  vendor?: Vendor;

  loading = false;

  ngOnInit(): void {
    
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );
    
    this.loadContract(id);

  }

  private loadContract(id: number): void {

  console.log('Loading contract id:', id);

  this.loading = true;

  this.contractService
    .getById(id)
    .subscribe({

      next: contract => {

        console.log('Contract received:', contract);

        this.contract = contract;

        this.loadVendor(contract.vendorId);

      },

      error: err => {

        console.error('Contract Error:', err);

        this.loading = false;

      }

    });

}

private loadVendor(vendorId: number): void {

  this.vendorService
    .getById(vendorId)
    .subscribe({

      next: (vendor: Vendor) => {

        this.vendor = vendor;

        this.loading = false;

        this.cdr.detectChanges();

      },

      error: (err: any) => {

        console.error(err);

        this.loading = false;

        this.cdr.detectChanges();

      }

    });

}
  edit(): void {

  this.router.navigate([

    '/contracts/edit',

    this.contract.id

  ]);

}

  back(): void {

    this.router.navigate([
      '/contracts'
    ]);

  }

  


}