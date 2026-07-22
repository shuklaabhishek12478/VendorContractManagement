import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRecentActivity } from './user-recent-activity';

describe('UserRecentActivity', () => {
  let component: UserRecentActivity;
  let fixture: ComponentFixture<UserRecentActivity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRecentActivity],
    }).compileComponents();

    fixture = TestBed.createComponent(UserRecentActivity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
