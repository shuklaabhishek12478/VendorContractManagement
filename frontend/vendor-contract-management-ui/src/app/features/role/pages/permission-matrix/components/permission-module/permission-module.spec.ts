import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionModule } from './permission-module';

describe('PermissionModule', () => {
  let component: PermissionModule;
  let fixture: ComponentFixture<PermissionModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionModule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
