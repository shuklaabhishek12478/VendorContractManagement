import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveContract } from './approve-contract';

describe('ApproveContract', () => {
  let component: ApproveContract;
  let fixture: ComponentFixture<ApproveContract>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveContract],
    }).compileComponents();

    fixture = TestBed.createComponent(ApproveContract);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
