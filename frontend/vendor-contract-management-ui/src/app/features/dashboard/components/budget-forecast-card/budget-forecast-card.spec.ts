import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetForecastCard } from './budget-forecast-card';

describe('BudgetForecastCard', () => {
  let component: BudgetForecastCard;
  let fixture: ComponentFixture<BudgetForecastCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetForecastCard],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetForecastCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
