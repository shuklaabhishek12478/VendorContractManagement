import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySpendChart } from './category-spend-chart';

describe('CategorySpendChart', () => {
  let component: CategorySpendChart;
  let fixture: ComponentFixture<CategorySpendChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorySpendChart],
    }).compileComponents();

    fixture = TestBed.createComponent(CategorySpendChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
