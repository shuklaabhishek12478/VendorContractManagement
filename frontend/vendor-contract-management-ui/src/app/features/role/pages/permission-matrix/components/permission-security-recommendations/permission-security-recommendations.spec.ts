import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionSecurityRecommendations } from './permission-security-recommendations';

describe('PermissionSecurityRecommendations', () => {
  let component: PermissionSecurityRecommendations;
  let fixture: ComponentFixture<PermissionSecurityRecommendations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionSecurityRecommendations],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionSecurityRecommendations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
