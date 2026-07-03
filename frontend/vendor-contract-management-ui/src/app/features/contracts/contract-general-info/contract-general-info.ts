import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contract } from '../../../core/models/contract.model';
import { Vendor } from '../../../core/models/vendor.model';


@Component({
  selector: 'app-contract-general-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contract-general-info.html',
  styleUrls: ['./contract-general-info.scss']
})
export class ContractGeneralInfoComponent {

  @Input({ required: true })
  contract!: Contract;

  @Input()
  vendor?: Vendor;

}