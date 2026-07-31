import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBreadcrumb } from './report-breadcrumb';

describe('ReportBreadcrumb', () => {
  let component: ReportBreadcrumb;
  let fixture: ComponentFixture<ReportBreadcrumb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportBreadcrumb],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportBreadcrumb);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
