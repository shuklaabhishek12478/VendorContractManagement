import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorActionsRenderer } from './vendor-actions-renderer';

describe('VendorActionsRenderer', () => {
  let component: VendorActionsRenderer;
  let fixture: ComponentFixture<VendorActionsRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorActionsRenderer],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorActionsRenderer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
