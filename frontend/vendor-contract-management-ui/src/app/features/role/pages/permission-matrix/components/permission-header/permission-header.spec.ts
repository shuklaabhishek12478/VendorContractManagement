import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionHeader } from './permission-header';

describe('PermissionHeader', () => {
  let component: PermissionHeader;
  let fixture: ComponentFixture<PermissionHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
