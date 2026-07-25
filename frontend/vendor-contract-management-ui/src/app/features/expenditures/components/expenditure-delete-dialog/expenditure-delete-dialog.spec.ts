import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureDeleteDialog } from './expenditure-delete-dialog';

describe('ExpenditureDeleteDialog', () => {
  let component: ExpenditureDeleteDialog;
  let fixture: ComponentFixture<ExpenditureDeleteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenditureDeleteDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenditureDeleteDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
