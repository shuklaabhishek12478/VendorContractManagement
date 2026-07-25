import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureList } from './expenditure-list';

describe('ExpenditureList', () => {
  let component: ExpenditureList;
  let fixture: ComponentFixture<ExpenditureList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenditureList],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenditureList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
