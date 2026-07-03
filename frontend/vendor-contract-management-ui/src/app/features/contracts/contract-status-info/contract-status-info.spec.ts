import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractStatusInfo } from './contract-status-info';

describe('ContractStatusInfo', () => {
  let component: ContractStatusInfo;
  let fixture: ComponentFixture<ContractStatusInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractStatusInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractStatusInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
