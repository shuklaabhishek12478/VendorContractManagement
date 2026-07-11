import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorRecentActivity } from './vendor-recent-activity';

describe('VendorRecentActivity', () => {
  let component: VendorRecentActivity;
  let fixture: ComponentFixture<VendorRecentActivity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorRecentActivity],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorRecentActivity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
