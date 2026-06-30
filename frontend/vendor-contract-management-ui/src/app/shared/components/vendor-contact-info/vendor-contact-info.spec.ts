import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorContactInfo } from './vendor-contact-info';

describe('VendorContactInfo', () => {
  let component: VendorContactInfo;
  let fixture: ComponentFixture<VendorContactInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorContactInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorContactInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
