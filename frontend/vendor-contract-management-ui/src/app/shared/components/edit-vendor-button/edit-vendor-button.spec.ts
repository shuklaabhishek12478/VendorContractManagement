import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVendorButton } from './edit-vendor-button';

describe('EditVendorButton', () => {
  let component: EditVendorButton;
  let fixture: ComponentFixture<EditVendorButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditVendorButton],
    }).compileComponents();

    fixture = TestBed.createComponent(EditVendorButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
