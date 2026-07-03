import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveContractButton } from './remove-contract-button';

describe('RemoveContractButton', () => {
  let component: RemoveContractButton;
  let fixture: ComponentFixture<RemoveContractButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveContractButton],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveContractButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
