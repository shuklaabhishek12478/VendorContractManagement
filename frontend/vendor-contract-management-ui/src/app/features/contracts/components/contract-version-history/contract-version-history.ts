import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contract } from '../../../../core/models/contract.model';
import { getContractStatusLabel } from '../../../../core/constants/contract-status-options';


@Component({
  selector: 'app-contract-version-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contract-version-history.html',
  styleUrls: ['./contract-version-history.scss']
})
export class ContractVersionHistoryComponent {

  @Input({ required: true })
  contracts: Contract[] = [];

  getStatus(status:number):string{

    return getContractStatusLabel(status);

  }

}