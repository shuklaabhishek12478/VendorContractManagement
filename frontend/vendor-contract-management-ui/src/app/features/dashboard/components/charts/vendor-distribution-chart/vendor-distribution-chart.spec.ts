import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDistributionChart } from './vendor-distribution-chart';

describe('VendorDistributionChart', () => {
  let component: VendorDistributionChart;
  let fixture: ComponentFixture<VendorDistributionChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorDistributionChart],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorDistributionChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
