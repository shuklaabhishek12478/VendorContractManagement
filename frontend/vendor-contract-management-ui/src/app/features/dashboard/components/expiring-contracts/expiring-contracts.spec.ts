import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiringContracts } from './expiring-contracts';

describe('ExpiringContracts', () => {
  let component: ExpiringContracts;
  let fixture: ComponentFixture<ExpiringContracts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpiringContracts],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpiringContracts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
