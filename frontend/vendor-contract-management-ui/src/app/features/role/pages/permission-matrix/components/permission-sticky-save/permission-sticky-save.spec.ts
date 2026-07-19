import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionStickySave } from './permission-sticky-save';

describe('PermissionStickySave', () => {
  let component: PermissionStickySave;
  let fixture: ComponentFixture<PermissionStickySave>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionStickySave],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionStickySave);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
