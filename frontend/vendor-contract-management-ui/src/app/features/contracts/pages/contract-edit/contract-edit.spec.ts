import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractEdit } from './contract-edit';

describe('ContractEdit', () => {
  let component: ContractEdit;
  let fixture: ComponentFixture<ContractEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
