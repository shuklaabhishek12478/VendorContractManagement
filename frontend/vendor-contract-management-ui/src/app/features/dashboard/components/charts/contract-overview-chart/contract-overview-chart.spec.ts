import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractOverviewChart } from './contract-overview-chart';

describe('ContractOverviewChart', () => {
  let component: ContractOverviewChart;
  let fixture: ComponentFixture<ContractOverviewChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractOverviewChart],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractOverviewChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
