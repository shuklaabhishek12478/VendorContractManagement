import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractWorkflowCard } from './contract-workflow-card';

describe('ContractWorkflowCard', () => {
  let component: ContractWorkflowCard;
  let fixture: ComponentFixture<ContractWorkflowCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractWorkflowCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractWorkflowCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
