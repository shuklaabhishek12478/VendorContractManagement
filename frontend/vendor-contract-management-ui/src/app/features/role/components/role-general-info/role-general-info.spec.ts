import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleGeneralInfo } from './role-general-info';

describe('RoleGeneralInfo', () => {
  let component: RoleGeneralInfo;
  let fixture: ComponentFixture<RoleGeneralInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleGeneralInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(RoleGeneralInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
