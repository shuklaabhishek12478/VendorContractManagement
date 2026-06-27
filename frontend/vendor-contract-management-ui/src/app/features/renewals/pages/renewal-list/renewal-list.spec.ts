import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalList } from './renewal-list';

describe('RenewalList', () => {
  let component: RenewalList;
  let fixture: ComponentFixture<RenewalList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenewalList],
    }).compileComponents();

    fixture = TestBed.createComponent(RenewalList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
