import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneRole } from './clone-role';

describe('CloneRole', () => {
  let component: CloneRole;
  let fixture: ComponentFixture<CloneRole>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloneRole],
    }).compileComponents();

    fixture = TestBed.createComponent(CloneRole);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
