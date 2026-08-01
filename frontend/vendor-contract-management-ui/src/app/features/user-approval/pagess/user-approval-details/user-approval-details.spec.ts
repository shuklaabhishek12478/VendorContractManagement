import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApprovalDetails } from './user-approval-details';

describe('UserApprovalDetails', () => {
  let component: UserApprovalDetails;
  let fixture: ComponentFixture<UserApprovalDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserApprovalDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(UserApprovalDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
