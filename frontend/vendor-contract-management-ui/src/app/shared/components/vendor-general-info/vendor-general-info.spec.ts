import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorGeneralInfo } from './vendor-general-info';

describe('VendorGeneralInfo', () => {
  let component: VendorGeneralInfo;
  let fixture: ComponentFixture<VendorGeneralInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorGeneralInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorGeneralInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
