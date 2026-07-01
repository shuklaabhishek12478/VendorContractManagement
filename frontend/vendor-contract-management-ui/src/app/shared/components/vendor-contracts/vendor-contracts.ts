import {
  Component,
  Input
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Contract } from '../../../core/models/contract.model';

@Component({

  selector: 'app-vendor-contracts',

  standalone: true,

  imports: [

    CommonModule

  ],

  templateUrl: './vendor-contracts.html',

  styleUrl: './vendor-contracts.scss'

})

export class VendorContractsComponent {

  @Input()

  contracts: Contract[] = [];

}