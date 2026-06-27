import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractCreate } from './contract-create';

describe('ContractCreate', () => {
  let component: ContractCreate;
  let fixture: ComponentFixture<ContractCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
