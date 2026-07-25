import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureSummaryCards } from './expenditure-summary-cards';

describe('ExpenditureSummaryCards', () => {
  let component: ExpenditureSummaryCards;
  let fixture: ComponentFixture<ExpenditureSummaryCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenditureSummaryCards],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenditureSummaryCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
