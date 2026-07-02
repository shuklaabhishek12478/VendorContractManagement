import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectContract } from './reject-contract';

describe('RejectContract', () => {
  let component: RejectContract;
  let fixture: ComponentFixture<RejectContract>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectContract],
    }).compileComponents();

    fixture = TestBed.createComponent(RejectContract);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
