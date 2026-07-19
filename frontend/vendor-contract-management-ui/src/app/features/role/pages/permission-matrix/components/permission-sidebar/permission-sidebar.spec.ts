import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionSidebar } from './permission-sidebar';

describe('PermissionSidebar', () => {
  let component: PermissionSidebar;
  let fixture: ComponentFixture<PermissionSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionSidebar],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
