import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vendor } from '../../../../core/models/vendor.model';
import { VendorService } from '../../../../core/services/vendor.service';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-vendor-details',
  standalone: true,
  imports: [CommonModule,
    MatTabsModule],
  templateUrl: './vendor-details.html',
  styleUrl: './vendor-details.scss'
})
export class VendorDetailsComponent implements OnInit {
private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private vendorService = inject(VendorService);

constructor() {
  console.log('VENDOR DETAILS COMPONENT LOADED');
}

  vendor?: Vendor;
  id!: number;

  ngOnInit(): void {

  const id =
    Number(
      this.route.snapshot.paramMap.get('id')
    );

  console.log('Vendor Id:', id);

  this.vendorService
    .getById(id)
    .subscribe({

 next: (response) => {

  this.vendor = response;

  this.cdr.detectChanges();

  console.log('Vendor:', this.vendor);
}
    });
}

}