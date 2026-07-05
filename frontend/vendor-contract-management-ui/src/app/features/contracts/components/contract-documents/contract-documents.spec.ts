import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDocuments } from './contract-documents';

describe('ContractDocuments', () => {
  let component: ContractDocuments;
  let fixture: ComponentFixture<ContractDocuments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractDocuments],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractDocuments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
