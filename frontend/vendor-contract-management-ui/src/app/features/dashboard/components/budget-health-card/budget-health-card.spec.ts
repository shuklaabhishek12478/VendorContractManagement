import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetHealthCard } from './budget-health-card';

describe('BudgetHealthCard', () => {
  let component: BudgetHealthCard;
  let fixture: ComponentFixture<BudgetHealthCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetHealthCard],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetHealthCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
