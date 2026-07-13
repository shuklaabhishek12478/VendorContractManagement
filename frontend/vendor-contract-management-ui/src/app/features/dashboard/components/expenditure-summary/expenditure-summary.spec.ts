import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureSummary } from './expenditure-summary';

describe('ExpenditureSummary', () => {
  let component: ExpenditureSummary;
  let fixture: ComponentFixture<ExpenditureSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenditureSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenditureSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
