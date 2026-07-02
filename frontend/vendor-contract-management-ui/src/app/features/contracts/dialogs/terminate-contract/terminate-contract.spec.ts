import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminateContract } from './terminate-contract';

describe('TerminateContract', () => {
  let component: TerminateContract;
  let fixture: ComponentFixture<TerminateContract>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminateContract],
    }).compileComponents();

    fixture = TestBed.createComponent(TerminateContract);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
