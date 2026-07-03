import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContractButton } from './add-contract-button';

describe('AddContractButton', () => {
  let component: AddContractButton;
  let fixture: ComponentFixture<AddContractButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddContractButton],
    }).compileComponents();

    fixture = TestBed.createComponent(AddContractButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
