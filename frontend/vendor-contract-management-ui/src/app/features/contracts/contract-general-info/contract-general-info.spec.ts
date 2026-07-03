import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractGeneralInfo } from './contract-general-info';

describe('ContractGeneralInfo', () => {
  let component: ContractGeneralInfo;
  let fixture: ComponentFixture<ContractGeneralInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractGeneralInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractGeneralInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
