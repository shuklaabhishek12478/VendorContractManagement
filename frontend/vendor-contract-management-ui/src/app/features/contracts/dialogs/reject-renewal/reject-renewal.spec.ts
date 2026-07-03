import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectRenewal } from './reject-renewal';

describe('RejectRenewal', () => {
  let component: RejectRenewal;
  let fixture: ComponentFixture<RejectRenewal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectRenewal],
    }).compileComponents();

    fixture = TestBed.createComponent(RejectRenewal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
