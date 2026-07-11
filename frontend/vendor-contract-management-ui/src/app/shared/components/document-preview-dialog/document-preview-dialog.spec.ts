import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPreviewDialog } from './document-preview-dialog';

describe('DocumentPreviewDialog', () => {
  let component: DocumentPreviewDialog;
  let fixture: ComponentFixture<DocumentPreviewDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentPreviewDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentPreviewDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
