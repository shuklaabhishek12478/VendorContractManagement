import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionRiskScore } from './permission-risk-score';

describe('PermissionRiskScore', () => {
  let component: PermissionRiskScore;
  let fixture: ComponentFixture<PermissionRiskScore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionRiskScore],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionRiskScore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
