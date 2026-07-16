import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAppearanceInfo } from './role-appearance-info';

describe('RoleAppearanceInfo', () => {
  let component: RoleAppearanceInfo;
  let fixture: ComponentFixture<RoleAppearanceInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleAppearanceInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(RoleAppearanceInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
