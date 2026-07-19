import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionChangePreview } from './permission-change-preview';

describe('PermissionChangePreview', () => {
  let component: PermissionChangePreview;
  let fixture: ComponentFixture<PermissionChangePreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionChangePreview],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionChangePreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
