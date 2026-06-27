import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveVendorButton } from './remove-vendor-button';

describe('RemoveVendorButton', () => {
  let component: RemoveVendorButton;
  let fixture: ComponentFixture<RemoveVendorButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveVendorButton],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveVendorButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
