import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractRecentActivity } from './contract-recent-activity';

describe('ContractRecentActivity', () => {
  let component: ContractRecentActivity;
  let fixture: ComponentFixture<ContractRecentActivity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractRecentActivity],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractRecentActivity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
