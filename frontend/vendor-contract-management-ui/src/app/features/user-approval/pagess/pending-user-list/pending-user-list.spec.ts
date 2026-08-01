import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingUserList } from './pending-user-list';

describe('PendingUserList', () => {
  let component: PendingUserList;
  let fixture: ComponentFixture<PendingUserList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingUserList],
    }).compileComponents();

    fixture = TestBed.createComponent(PendingUserList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
