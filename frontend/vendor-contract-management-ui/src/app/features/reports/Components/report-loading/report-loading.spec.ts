import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLoading } from './report-loading';

describe('ReportLoading', () => {
  let component: ReportLoading;
  let fixture: ComponentFixture<ReportLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportLoading],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportLoading);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
