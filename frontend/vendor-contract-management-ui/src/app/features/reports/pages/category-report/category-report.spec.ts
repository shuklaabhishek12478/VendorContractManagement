import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryReport } from './category-report';

describe('CategoryReport', () => {
  let component: CategoryReport;
  let fixture: ComponentFixture<CategoryReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryReport],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
