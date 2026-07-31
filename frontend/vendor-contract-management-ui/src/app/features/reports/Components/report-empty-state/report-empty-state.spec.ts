import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEmptyState } from './report-empty-state';

describe('ReportEmptyState', () => {
  let component: ReportEmptyState;
  let fixture: ComponentFixture<ReportEmptyState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportEmptyState],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportEmptyState);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
