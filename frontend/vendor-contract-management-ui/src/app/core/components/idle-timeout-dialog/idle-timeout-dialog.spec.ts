import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdleTimeoutDialog } from './idle-timeout-dialog';

describe('IdleTimeoutDialog', () => {
  let component: IdleTimeoutDialog;
  let fixture: ComponentFixture<IdleTimeoutDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdleTimeoutDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(IdleTimeoutDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
