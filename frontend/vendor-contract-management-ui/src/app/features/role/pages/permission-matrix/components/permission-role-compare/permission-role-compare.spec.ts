import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionRoleCompare } from './permission-role-compare';

describe('PermissionRoleCompare', () => {
  let component: PermissionRoleCompare;
  let fixture: ComponentFixture<PermissionRoleCompare>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionRoleCompare],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionRoleCompare);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
