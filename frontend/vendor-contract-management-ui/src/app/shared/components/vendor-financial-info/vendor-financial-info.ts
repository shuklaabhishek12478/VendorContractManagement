import {
  Component,
  Input
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Vendor } from '../../../core/models/vendor.model';
import { Currency } from '../../../core/models/currency.enum';
import { PaymentMethod } from '../../../core/models/payment-method.enum';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { inject } from '@angular/core';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-vendor-financial-info',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
MatButtonModule,
ClipboardModule
  ],
  templateUrl: './vendor-financial-info.html',
  styleUrls: ['./vendor-financial-info.scss']
})
export class VendorFinancialInfoComponent {
  
private clipboard = inject(Clipboard);

private snackbar = inject(SnackbarService);

  @Input({ required: true })
  vendor!: Vendor;

  showAccountNumber = false;

toggleAccountNumber(): void {

    this.showAccountNumber =
        !this.showAccountNumber;

}

  getPaymentMethodName(value?: PaymentMethod): string {

  if (value == null) {
    return '-';
  }

  return PaymentMethod[value];

}

getCurrencyName(value?: Currency): string {

  if (value == null) {
    return '-';
  }

  return Currency[value];

}

maskAccountNumber(accountNumber?: string): string {

    if (!accountNumber) {

        return '-';

    }

    if (this.showAccountNumber) {

        return accountNumber;

    }

    if (accountNumber.length <= 4) {

        return accountNumber;

    }

    return '*'.repeat(
        accountNumber.length - 4
    ) + accountNumber.slice(-4);

}

copyAccountNumber(): void {

    if (!this.vendor.accountNumber) {

        return;

    }

    this.clipboard.copy(
        this.vendor.accountNumber
    );

    this.snackbar.success(
        'Account number copied.'
    );

}
}