import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionInsights } from './permission-insights';

describe('PermissionInsights', () => {
  let component: PermissionInsights;
  let fixture: ComponentFixture<PermissionInsights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionInsights],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionInsights);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
