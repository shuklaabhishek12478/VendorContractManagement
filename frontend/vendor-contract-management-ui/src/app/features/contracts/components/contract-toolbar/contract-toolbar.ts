import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AddContractButtonComponent } from '../add-contract-button/add-contract-button';
import { EditContractButtonComponent } from '../edit-contract-button/edit-contract-button';
import { ArchiveContractButtonComponent } from '../archive-contract-button/archive-contract-button';
import { RemoveContractButtonComponent } from '../remove-contract-button/remove-contract-button';
import { Contract } from '../../../../core/models/contract.model';
import { ContractStatus } from '../../../../core/models/contract-status.enum';


@Component({
  selector: 'app-contract-toolbar',
  standalone: true,
  imports: [
    AddContractButtonComponent,
    EditContractButtonComponent,
    ArchiveContractButtonComponent,
    RemoveContractButtonComponent
  ],
  templateUrl: './contract-toolbar.html',
  styleUrls: ['./contract-toolbar.scss']
})
export class ContractToolbarComponent {
  protected readonly ContractStatus = ContractStatus;

  @Input()
  selectedContract: Contract | null = null;

  @Input()
  selectedContracts: Contract[] = [];

  get canAdd(): boolean {
    return this.selectedContracts.length === 0;
  }

  get canEdit(): boolean {
     if (!this.selectedContract) {
    return false;
     }
     return this.selectedContract.status === ContractStatus.Draft ||

         this.selectedContract.status === ContractStatus.Rejected ||

         this.selectedContract.status === ContractStatus.RenewalRejected;
  }

  get canArchive(): boolean {
    return this.selectedContracts.length > 0;
  }

  get canRemove(): boolean {
    return this.selectedContracts.length > 0;
  }

  @Output()
  add = new EventEmitter<void>();

  @Output()
  edit = new EventEmitter<void>();

  @Output()
  archive = new EventEmitter<void>();

  @Output()
  remove = new EventEmitter<void>();
  

}