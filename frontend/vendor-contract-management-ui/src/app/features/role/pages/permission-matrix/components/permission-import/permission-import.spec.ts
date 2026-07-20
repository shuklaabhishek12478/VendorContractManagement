import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionImport } from './permission-import';

describe('PermissionImport', () => {
  let component: PermissionImport;
  let fixture: ComponentFixture<PermissionImport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionImport],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionImport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
