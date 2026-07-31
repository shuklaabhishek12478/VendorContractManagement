import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSchedulerDialog } from './report-scheduler-dialog';

describe('ReportSchedulerDialog', () => {
  let component: ReportSchedulerDialog;
  let fixture: ComponentFixture<ReportSchedulerDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportSchedulerDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportSchedulerDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
