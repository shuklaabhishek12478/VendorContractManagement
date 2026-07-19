import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionSummary } from './permission-summary';

describe('PermissionSummary', () => {
  let component: PermissionSummary;
  let fixture: ComponentFixture<PermissionSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
