import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleToolbar } from './role-toolbar';

describe('RoleToolbar', () => {
  let component: RoleToolbar;
  let fixture: ComponentFixture<RoleToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleToolbar],
    }).compileComponents();

    fixture = TestBed.createComponent(RoleToolbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
