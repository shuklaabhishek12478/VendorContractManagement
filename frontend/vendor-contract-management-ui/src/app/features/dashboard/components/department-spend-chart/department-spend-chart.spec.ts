import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentSpendChart } from './department-spend-chart';

describe('DepartmentSpendChart', () => {
  let component: DepartmentSpendChart;
  let fixture: ComponentFixture<DepartmentSpendChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentSpendChart],
    }).compileComponents();

    fixture = TestBed.createComponent(DepartmentSpendChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
