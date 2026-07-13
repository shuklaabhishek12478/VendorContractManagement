import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSpendChart } from './vendor-spend-chart';

describe('VendorSpendChart', () => {
  let component: VendorSpendChart;
  let fixture: ComponentFixture<VendorSpendChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorSpendChart],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorSpendChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
