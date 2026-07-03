import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contract } from '../../../core/models/contract.model';
import { CONTRACT_STATUS_OPTIONS } from '../../../core/constants/contract-status-options';


@Component({
  selector: 'app-contract-status-info',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './contract-status-info.html',
  styleUrls: ['./contract-status-info.scss']
})
export class ContractStatusInfoComponent {

  @Input({ required: true })
  contract!: Contract;

  get statusName(): string {

    return CONTRACT_STATUS_OPTIONS.find(

      x => x.value === this.contract.status

    )?.label ?? '';

  }

}