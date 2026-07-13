import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureTrendChart } from './expenditure-trend-chart';

describe('ExpenditureTrendChart', () => {
  let component: ExpenditureTrendChart;
  let fixture: ComponentFixture<ExpenditureTrendChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenditureTrendChart],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenditureTrendChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
