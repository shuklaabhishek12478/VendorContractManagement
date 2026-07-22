import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSummaryCards } from './user-summary-cards';

describe('UserSummaryCards', () => {
  let component: UserSummaryCards;
  let fixture: ComponentFixture<UserSummaryCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSummaryCards],
    }).compileComponents();

    fixture = TestBed.createComponent(UserSummaryCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
