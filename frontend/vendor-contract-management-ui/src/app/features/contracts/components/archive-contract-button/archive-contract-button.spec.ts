import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveContractButton } from './archive-contract-button';

describe('ArchiveContractButton', () => {
  let component: ArchiveContractButton;
  let fixture: ComponentFixture<ArchiveContractButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveContractButton],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchiveContractButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
