import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionExport } from './permission-export';

describe('PermissionExport', () => {
  let component: PermissionExport;
  let fixture: ComponentFixture<PermissionExport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionExport],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionExport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
