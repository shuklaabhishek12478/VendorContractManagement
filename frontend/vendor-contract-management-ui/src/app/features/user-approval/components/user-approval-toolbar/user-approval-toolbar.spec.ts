import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApprovalToolbar } from './user-approval-toolbar';

describe('UserApprovalToolbar', () => {
  let component: UserApprovalToolbar;
  let fixture: ComponentFixture<UserApprovalToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserApprovalToolbar],
    }).compileComponents();

    fixture = TestBed.createComponent(UserApprovalToolbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
