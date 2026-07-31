import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportToolbar } from './report-toolbar';

describe('ReportToolbar', () => {
  let component: ReportToolbar;
  let fixture: ComponentFixture<ReportToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportToolbar],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportToolbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
