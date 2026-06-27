import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorButton } from './add-vendor-button';

describe('AddVendorButton', () => {
  let component: AddVendorButton;
  let fixture: ComponentFixture<AddVendorButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVendorButton],
    }).compileComponents();

    fixture = TestBed.createComponent(AddVendorButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
