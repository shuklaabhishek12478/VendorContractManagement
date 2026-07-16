import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleUsageInfo } from './role-usage-info';

describe('RoleUsageInfo', () => {
  let component: RoleUsageInfo;
  let fixture: ComponentFixture<RoleUsageInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleUsageInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(RoleUsageInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
