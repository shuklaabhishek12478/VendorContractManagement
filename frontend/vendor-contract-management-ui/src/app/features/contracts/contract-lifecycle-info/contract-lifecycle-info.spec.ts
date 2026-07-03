import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractLifecycleInfo } from './contract-lifecycle-info';

describe('ContractLifecycleInfo', () => {
  let component: ContractLifecycleInfo;
  let fixture: ComponentFixture<ContractLifecycleInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractLifecycleInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractLifecycleInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
