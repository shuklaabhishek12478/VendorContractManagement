import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractVersionHistory } from './contract-version-history';

describe('ContractVersionHistory', () => {
  let component: ContractVersionHistory;
  let fixture: ComponentFixture<ContractVersionHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractVersionHistory],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractVersionHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
