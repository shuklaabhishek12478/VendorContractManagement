import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractService } from '../../../../core/services/contract.service';
import { Contract } from '../../../../core/models/contract.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contract-details',
  standalone:true,
  imports: [
  CommonModule,
  MatCardModule,
  MatButtonModule
],
  templateUrl: './contract-details.html',
  styleUrls: ['./contract-details.scss']
})
export class ContractDetailsComponent implements OnInit {

  private route = inject(ActivatedRoute);

  private contractService = inject(ContractService);

  contract!: Contract;

  loading = false;

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadContract(id);

  }

  loadContract(id: number): void {

    this.loading = true;

    this.contractService
      .getById(id)
      .subscribe({

        next: response => {

          this.contract = response;

          this.loading = false;

        },

        error: (err: any) => {

          console.error(err);

          this.loading = false;

        }

      });

  }

}