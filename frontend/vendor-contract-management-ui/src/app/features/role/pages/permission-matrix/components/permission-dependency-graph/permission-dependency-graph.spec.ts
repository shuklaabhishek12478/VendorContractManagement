import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionDependencyGraph } from './permission-dependency-graph';

describe('PermissionDependencyGraph', () => {
  let component: PermissionDependencyGraph;
  let fixture: ComponentFixture<PermissionDependencyGraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionDependencyGraph],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionDependencyGraph);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
