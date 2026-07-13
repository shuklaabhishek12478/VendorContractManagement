import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractStatusChart } from './contract-status-chart';

describe('ContractStatusChart', () => {
  let component: ContractStatusChart;
  let fixture: ComponentFixture<ContractStatusChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractStatusChart],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractStatusChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
