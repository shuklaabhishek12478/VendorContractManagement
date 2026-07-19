import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionToolbar } from './permission-toolbar';

describe('PermissionToolbar', () => {
  let component: PermissionToolbar;
  let fixture: ComponentFixture<PermissionToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionToolbar],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionToolbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
