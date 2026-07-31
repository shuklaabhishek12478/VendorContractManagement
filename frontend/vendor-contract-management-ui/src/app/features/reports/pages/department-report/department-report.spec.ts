import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentReport } from './department-report';

describe('DepartmentReport', () => {
  let component: DepartmentReport;
  let fixture: ComponentFixture<DepartmentReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentReport],
    }).compileComponents();

    fixture = TestBed.createComponent(DepartmentReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
