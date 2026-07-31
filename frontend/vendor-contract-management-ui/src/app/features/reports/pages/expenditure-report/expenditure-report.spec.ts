import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureReport } from './expenditure-report';

describe('ExpenditureReport', () => {
  let component: ExpenditureReport;
  let fixture: ComponentFixture<ExpenditureReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenditureReport],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenditureReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
