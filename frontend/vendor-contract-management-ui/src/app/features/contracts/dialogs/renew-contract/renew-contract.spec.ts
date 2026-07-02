import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewContract } from './renew-contract';

describe('RenewContract', () => {
  let component: RenewContract;
  let fixture: ComponentFixture<RenewContract>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenewContract],
    }).compileComponents();

    fixture = TestBed.createComponent(RenewContract);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
