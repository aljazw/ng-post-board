import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommentForm } from './create-comment-form';

describe('CreateCommentForm', () => {
  let component: CreateCommentForm;
  let fixture: ComponentFixture<CreateCommentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCommentForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCommentForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
