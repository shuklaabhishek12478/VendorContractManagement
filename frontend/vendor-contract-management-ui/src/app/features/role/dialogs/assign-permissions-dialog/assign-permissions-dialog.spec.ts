import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPermissionsDialog } from './assign-permissions-dialog';

describe('AssignPermissionsDialog', () => {
  let component: AssignPermissionsDialog;
  let fixture: ComponentFixture<AssignPermissionsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignPermissionsDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignPermissionsDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
