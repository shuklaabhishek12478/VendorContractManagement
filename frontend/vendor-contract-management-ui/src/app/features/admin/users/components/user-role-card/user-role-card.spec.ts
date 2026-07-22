import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleCard } from './user-role-card';

describe('UserRoleCard', () => {
  let component: UserRoleCard;
  let fixture: ComponentFixture<UserRoleCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoleCard],
    }).compileComponents();

    fixture = TestBed.createComponent(UserRoleCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
