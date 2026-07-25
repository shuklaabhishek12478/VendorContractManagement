import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureForm } from './expenditure-form';

describe('ExpenditureForm', () => {
  let component: ExpenditureForm;
  let fixture: ComponentFixture<ExpenditureForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenditureForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenditureForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
