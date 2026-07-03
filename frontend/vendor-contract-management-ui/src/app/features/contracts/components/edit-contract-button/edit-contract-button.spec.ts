import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContractButton } from './edit-contract-button';

describe('EditContractButton', () => {
  let component: EditContractButton;
  let fixture: ComponentFixture<EditContractButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditContractButton],
    }).compileComponents();

    fixture = TestBed.createComponent(EditContractButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
