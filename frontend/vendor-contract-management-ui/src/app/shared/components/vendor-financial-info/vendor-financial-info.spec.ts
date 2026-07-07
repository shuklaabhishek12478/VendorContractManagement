import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorFinancialInfo } from './vendor-financial-info';

describe('VendorFinancialInfo', () => {
  let component: VendorFinancialInfo;
  let fixture: ComponentFixture<VendorFinancialInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorFinancialInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorFinancialInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
