import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectUserDialog } from './reject-user-dialog';

describe('RejectUserDialog', () => {
  let component: RejectUserDialog;
  let fixture: ComponentFixture<RejectUserDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectUserDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(RejectUserDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
