import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureDetails } from './expenditure-details';

describe('ExpenditureDetails', () => {
  let component: ExpenditureDetails;
  let fixture: ComponentFixture<ExpenditureDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenditureDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenditureDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
