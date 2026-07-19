import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionTemplate } from './permission-template';

describe('PermissionTemplate', () => {
  let component: PermissionTemplate;
  let fixture: ComponentFixture<PermissionTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionTemplate],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionTemplate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
