import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureFilter } from './expenditure-filter';

describe('ExpenditureFilter', () => {
  let component: ExpenditureFilter;
  let fixture: ComponentFixture<ExpenditureFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenditureFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenditureFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
