import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateContract } from './activate-contract';

describe('ActivateContract', () => {
  let component: ActivateContract;
  let fixture: ComponentFixture<ActivateContract>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivateContract],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivateContract);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
