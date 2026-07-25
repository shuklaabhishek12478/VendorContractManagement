import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpenditure } from './add-expenditure';

describe('AddExpenditure', () => {
  let component: AddExpenditure;
  let fixture: ComponentFixture<AddExpenditure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExpenditure],
    }).compileComponents();

    fixture = TestBed.createComponent(AddExpenditure);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
