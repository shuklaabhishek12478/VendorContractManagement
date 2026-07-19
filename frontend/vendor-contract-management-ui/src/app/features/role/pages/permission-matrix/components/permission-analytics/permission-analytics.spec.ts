import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionAnalytics } from './permission-analytics';

describe('PermissionAnalytics', () => {
  let component: PermissionAnalytics;
  let fixture: ComponentFixture<PermissionAnalytics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionAnalytics],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionAnalytics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
