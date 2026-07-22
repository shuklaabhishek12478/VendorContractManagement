import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsToolbar } from './user-details-toolbar';

describe('UserDetailsToolbar', () => {
  let component: UserDetailsToolbar;
  let fixture: ComponentFixture<UserDetailsToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsToolbar],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsToolbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
