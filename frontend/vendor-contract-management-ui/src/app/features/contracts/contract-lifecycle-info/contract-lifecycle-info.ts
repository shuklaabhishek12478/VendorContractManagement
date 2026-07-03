import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contract } from '../../../core/models/contract.model';


@Component({
  selector: 'app-contract-lifecycle-info',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './contract-lifecycle-info.html',
  styleUrls: ['./contract-lifecycle-info.scss']
})
export class ContractLifecycleInfoComponent {

  @Input({ required: true })
  contract!: Contract;

}