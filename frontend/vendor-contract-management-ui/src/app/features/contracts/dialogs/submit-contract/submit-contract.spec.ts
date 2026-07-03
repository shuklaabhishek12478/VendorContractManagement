import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitContract } from './submit-contract';

describe('SubmitContract', () => {
  let component: SubmitContract;
  let fixture: ComponentFixture<SubmitContract>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitContract],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitContract);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
