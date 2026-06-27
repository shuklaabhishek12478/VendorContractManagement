import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveVendorButton } from './archive-vendor-button';

describe('ArchiveVendorButton', () => {
  let component: ArchiveVendorButton;
  let fixture: ComponentFixture<ArchiveVendorButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveVendorButton],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchiveVendorButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
