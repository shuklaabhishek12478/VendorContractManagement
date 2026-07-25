import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureStatusChip } from './expenditure-status-chip';

describe('ExpenditureStatusChip', () => {
  let component: ExpenditureStatusChip;
  let fixture: ComponentFixture<ExpenditureStatusChip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenditureStatusChip],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenditureStatusChip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
