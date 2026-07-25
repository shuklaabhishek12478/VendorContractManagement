import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExpenditure } from './edit-expenditure';

describe('EditExpenditure', () => {
  let component: EditExpenditure;
  let fixture: ComponentFixture<EditExpenditure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditExpenditure],
    }).compileComponents();

    fixture = TestBed.createComponent(EditExpenditure);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
