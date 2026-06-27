import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCreate } from './vendor-create';

describe('VendorCreate', () => {
  let component: VendorCreate;
  let fixture: ComponentFixture<VendorCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
