import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorComplianceInfo } from './vendor-compliance-info';

describe('VendorComplianceInfo', () => {
  let component: VendorComplianceInfo;
  let fixture: ComponentFixture<VendorComplianceInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorComplianceInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorComplianceInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
