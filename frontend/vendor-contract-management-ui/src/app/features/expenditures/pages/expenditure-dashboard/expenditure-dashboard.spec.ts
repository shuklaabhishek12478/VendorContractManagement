import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureDashboard } from './expenditure-dashboard';

describe('ExpenditureDashboard', () => {
  let component: ExpenditureDashboard;
  let fixture: ComponentFixture<ExpenditureDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenditureDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenditureDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
