import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveUserDialog } from './approve-user-dialog';

describe('ApproveUserDialog', () => {
  let component: ApproveUserDialog;
  let fixture: ComponentFixture<ApproveUserDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveUserDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ApproveUserDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
