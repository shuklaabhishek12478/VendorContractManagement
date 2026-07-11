import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDocuments } from './vendor-documents';

describe('VendorDocuments', () => {
  let component: VendorDocuments;
  let fixture: ComponentFixture<VendorDocuments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorDocuments],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorDocuments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
