import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureToolbar } from './expenditure-toolbar';

describe('ExpenditureToolbar', () => {
  let component: ExpenditureToolbar;
  let fixture: ComponentFixture<ExpenditureToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenditureToolbar],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenditureToolbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
