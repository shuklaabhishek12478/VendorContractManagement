import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionAuditTimeline } from './permission-audit-timeline';

describe('PermissionAuditTimeline', () => {
  let component: PermissionAuditTimeline;
  let fixture: ComponentFixture<PermissionAuditTimeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionAuditTimeline],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionAuditTimeline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
