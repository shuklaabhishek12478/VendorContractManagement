import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionFooter } from './permission-footer';

describe('PermissionFooter', () => {
  let component: PermissionFooter;
  let fixture: ComponentFixture<PermissionFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionFooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
