import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordReset } from './forgot-password-reset';

describe('ForgotPasswordReset', () => {
  let component: ForgotPasswordReset;
  let fixture: ComponentFixture<ForgotPasswordReset>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordReset],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordReset);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
