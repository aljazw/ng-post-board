import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentListDialog } from './comment-list-dialog';

describe('CommentListDialog', () => {
  let component: CommentListDialog;
  let fixture: ComponentFixture<CommentListDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentListDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentListDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
