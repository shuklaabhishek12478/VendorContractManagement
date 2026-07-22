import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGeneralInfo } from './user-general-info';

describe('UserGeneralInfo', () => {
  let component: UserGeneralInfo;
  let fixture: ComponentFixture<UserGeneralInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGeneralInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(UserGeneralInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
