import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionStatistics } from './permission-statistics';

describe('PermissionStatistics', () => {
  let component: PermissionStatistics;
  let fixture: ComponentFixture<PermissionStatistics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionStatistics],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionStatistics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
