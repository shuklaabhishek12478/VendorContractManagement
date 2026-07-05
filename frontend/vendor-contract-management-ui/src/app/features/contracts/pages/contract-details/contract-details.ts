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
import { MatDialog } from '@angular/material/dialog';
import { ApproveContractComponent } from '../../dialogs/approve-contract/approve-contract';
import { RejectContractComponent } from '../../dialogs/reject-contract/reject-contract';
import { SubmitContractComponent } from '../../dialogs/submit-contract/submit-contract';
import { ActivateContractComponent } from '../../dialogs/activate-contract/activate-contract';
import { ContractWorkflowCardComponent } from '../../components/contract-workflow-card/contract-workflow-card';
import { RenewContractComponent } from '../../dialogs/renew-contract/renew-contract';
import { RejectRenewalComponent } from '../../dialogs/reject-renewal/reject-renewal';
import { TerminateContractComponent } from '../../dialogs/terminate-contract/terminate-contract';
import { getContractStatusLabel} from '../../../../core/constants/contract-status-options';
import { ContractVersionHistoryComponent } from '../../components/contract-version-history/contract-version-history';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { forkJoin } from 'rxjs';
import { ContractStatus } from '../../../../core/models/contract-status.enum';
import { DocumentService } from '../../../../core/services/document.service';
import { ContractDocumentsComponent } from '../../components/contract-documents/contract-documents';
import { Document } from '../../../../core/models/document.model';


@Component({
  selector: 'app-contract-details',
  standalone:true,
  imports: [
  CommonModule,
  MatCardModule,
  MatButtonModule,
  ContractGeneralInfoComponent,
  ContractStatusInfoComponent,
  ContractLifecycleInfoComponent,
   ContractWorkflowCardComponent,
   ContractVersionHistoryComponent,
   ContractDocumentsComponent
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
  private dialog = inject(MatDialog);
  private snackbar = inject(SnackbarService);
  private documentService = inject(DocumentService);

  contract!: Contract;
  vendor?: Vendor;
   renewals: Contract[] = [];
  loading = false;
  documents: Document[] = [];
  documentsLoading = false;

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
        this.loadDocuments(contract.id);
        this.loadVendor(contract.vendorId);
        this.loadRenewals(contract.id);
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

get canEdit(): boolean {

  return this.contract.status === ContractStatus.Draft ||

         this.contract.status === ContractStatus.Rejected ||

         this.contract.status === ContractStatus.RenewalRejected;

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

 submitContract(): void {

  const dialogRef = this.dialog.open(
    SubmitContractComponent,
    {
      width: '420px'
    });

  dialogRef.afterClosed().subscribe(result => {

    if (!result) {

      return;

    }

    this.loading = true;

    this.contractService
      .submit(this.contract.id)
      .subscribe({

        next: () => {

          this.loadContract(this.contract.id);

        },

        error: err => {

          console.error(err);

          this.loading = false;

        }

      });

  });

}

approveContract(): void {

  const dialogRef =
      this.dialog.open(
          ApproveContractComponent
      );

  dialogRef.afterClosed()
      .subscribe(result => {

        if (!result)
            return;

        this.contractService
            .approve(this.contract.id)
            .subscribe({

              next: () => {

                this.loadContract(
                    this.contract.id
                );

              }

            });

      });

}

rejectContract() {

  const dialogRef = this.dialog.open(
    RejectContractComponent,
    {
      width: '500px'
    }
  );

  dialogRef.afterClosed().subscribe(reason => {

    if (!reason) {

      return;

    }

    this.loading = true;

    this.contractService
      .reject(this.contract.id, reason)
      .subscribe({

        next: () => {

          this.loadContract(this.contract.id);

        },

        error: (err: any) => {

          console.error(err);

          this.loading = false;

        }

      });

  });

}

submitAgainContract(): void {

  if (!this.contract) {
    return;
  }

  this.contractService
    .submitAgain(this.contract.id)
    .subscribe({

      next: () => {

        this.snackbar.success(
          'Contract submitted again successfully.'
        );

        this.loadContract(this.contract.id);

      },

      error: (err: any) => {

        console.error(err);

      }

    });

}

activateContract(): void {

  const dialogRef = this.dialog.open(

    ActivateContractComponent,

    {
      width: '420px'
    }

  );

  dialogRef.afterClosed()

    .subscribe(result => {

      if (!result)

        return;

      this.loading = true;

      this.contractService

        .activate(this.contract.id)

        .subscribe({

          next: () => {

            this.loadContract(this.contract.id);

          },

          error: err => {

            console.error(err);

            this.loading = false;

          }

        });

    });

}


renewContract(): void {

  const dialogRef = this.dialog.open(
    RenewContractComponent,
    {
      width: '500px',
      data: this.contract
    }
  );

  dialogRef.afterClosed().subscribe(result => {

    if (!result)
      return;

    this.loading = true;

    this.contractService
      .renew(
        this.contract.id,
        result
      )
      .subscribe({

        next: () => {

          this.loadContract(
            this.contract.id
          );

        },

        error: (err: any) => {

          console.error(err);

          this.loading = false;

        }

      });

  });

}


approveRenewal(): void {

  this.loading = true;

  this.contractService
      .approveRenewal(this.contract.id)
      .subscribe({

          next: () => {

              this.loadContract(this.contract.id);

          },

          error: (err: any) => {

              console.error(err);

              this.loading = false;

          }

      });

}


activateRenewal(): void {

  this.loading = true;

  this.contractService
      .activateRenewal(this.contract.id)
      .subscribe({

          next: () => {

              this.loadContract(this.contract.id);

          },

          error: (err: any) => {

              console.error(err);

              this.loading = false;

          }

      });

}


rejectRenewal(): void {

  const dialogRef = this.dialog.open(

    RejectRenewalComponent,

    {

      width: '500px'

    }

  );

  dialogRef.afterClosed()

    .subscribe(reason => {

      if (!reason)
        return;

      this.loading = true;

      this.contractService

        .rejectRenewal(

          this.contract.id,

          reason

        )

        .subscribe({

          next: () => {

            this.loadContract(

              this.contract.id

            );

          },

          error: (err: any) => {

            console.error(err);

            this.loading = false;

          }

        });

    });

}

terminateContract(): void {

    const dialogRef = this.dialog.open(

        TerminateContractComponent,

        {

            width: '500px'

        }

    );

    dialogRef.afterClosed()

        .subscribe(reason => {

            if (!reason)
                return;

            this.loading = true;

            this.contractService

                .terminate(

                    this.contract.id,

                    reason

                )

                .subscribe({

                    next: () => {

                        this.loadContract(

                            this.contract.id

                        );

                    },

                    error: (err: any) => {

                        console.error(err);

                        this.loading = false;

                    }

                });

        });

}

private loadRenewals(contractId: number): void {

  this.contractService
      .getRenewals(contractId)
      .subscribe({

          next: data => {

              console.log("Renewals API Response:", data);

              this.renewals = data;

          },

          error: (err: any) => {

              console.error(err);

          }

      });

}

getStatus(status: number): string {

  return getContractStatusLabel(status);

}

openRenewal(id:number):void{

this.router.navigate([

'/contracts',

id

]);

}


canSubmit(): boolean {

  return this.contract?.status === 0;

}

canSubmitAgain(): boolean {

  return this.contract?.status === 3;

}

canApprove(): boolean {

  return this.contract?.status === 1;

}

canReject(): boolean {

  return this.contract?.status === 1;

}

canActivate(): boolean {

  return this.contract?.status === 2;

}

canRenew(): boolean {

  return this.contract?.status === 4;

}

canTerminate(): boolean {

  return this.contract?.status === 4;

}

canApproveRenewal(): boolean {

  return this.contract?.status === 7;

}

canRejectRenewal(): boolean {

  return this.contract?.status === 7;

}

canActivateRenewal(): boolean {

  return this.contract?.status === 8;

}


private loadDocuments(
    contractId: number
): void {

    this.documentsLoading = true;

    this.documentService

        .getByContract(contractId)

        .subscribe({

            next: docs => {

                this.documents = docs;

                this.documentsLoading = false;

            },

            error: err => {

                console.error(err);

                this.documentsLoading = false;

            }

        });

}

uploadDocument(): void {

}

downloadDocument(
    id: number
): void {

}

deleteDocument(
    id: number
): void {

}
}