import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Contract } from '../../../../core/models/contract.model';
import { CONTRACT_STATUS_OPTIONS } from '../../../../core/constants/contract-status-options';
import { ContractStatus } from '../../../../core/models/contract-status.enum';

@Component({
  selector: 'app-contract-workflow-card',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './contract-workflow-card.html',
  styleUrls: ['./contract-workflow-card.scss']
})
export class ContractWorkflowCardComponent {

  protected readonly ContractStatus = ContractStatus;

  @Input({ required: true })
  contract!: Contract;

  @Output()
  submit = new EventEmitter<void>();

  @Output()
  approve = new EventEmitter<void>();

  @Output()
  activate = new EventEmitter<void>();

  @Output()
  reject = new EventEmitter<void>();

  @Output()
  renew = new EventEmitter<void>();
  
  @Output()
  approveRenewal = new EventEmitter<void>();

  @Output()
  activateRenewal = new EventEmitter<void>();

  @Output()
  rejectRenewal = new EventEmitter<void>();

  @Output()
  terminate = new EventEmitter<void>();

  get statusLabel(): string {

    return CONTRACT_STATUS_OPTIONS.find(
      x => x.value === this.contract.status
    )?.label ?? '';

  }

  onRenew(): void {

  this.renew.emit();

}

onApproveRenewal(): void {

  this.approveRenewal.emit();

}

onActivateRenewal(): void {

  this.activateRenewal.emit();

}

onRejectRenewal(): void {

  this.rejectRenewal.emit();

}

onTerminate(): void {

    this.terminate.emit();

}

}