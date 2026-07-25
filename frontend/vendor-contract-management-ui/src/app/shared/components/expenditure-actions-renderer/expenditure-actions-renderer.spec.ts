import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureActionsRenderer } from './expenditure-actions-renderer';

describe('ExpenditureActionsRenderer', () => {
  let component: ExpenditureActionsRenderer;
  let fixture: ComponentFixture<ExpenditureActionsRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenditureActionsRenderer],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenditureActionsRenderer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
