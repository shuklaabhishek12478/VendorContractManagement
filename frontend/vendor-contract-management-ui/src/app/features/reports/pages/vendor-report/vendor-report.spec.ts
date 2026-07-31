import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorReport } from './vendor-report';

describe('VendorReport', () => {
  let component: VendorReport;
  let fixture: ComponentFixture<VendorReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorReport],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
