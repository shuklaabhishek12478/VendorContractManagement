import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureForecast } from './expenditure-forecast';

describe('ExpenditureForecast', () => {
  let component: ExpenditureForecast;
  let fixture: ComponentFixture<ExpenditureForecast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenditureForecast],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenditureForecast);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
