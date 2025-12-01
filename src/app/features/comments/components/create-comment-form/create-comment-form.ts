import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/select';
import { Comment } from '../../comment.model';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { CommentService } from '../../../../core/services/comment.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-comment-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,

  ],
  templateUrl: './create-comment-form.html',
  styleUrl: './create-comment-form.css',
})
export class CreateCommentForm {

  readonly snackbar = inject(SnackbarService);
  readonly commentService = inject(CommentService);

  @Input() postId!: number;  
  @Output() cancel = new EventEmitter<boolean>();

  form: FormGroup = inject(FormBuilder).group({
    author: [
      '',
      [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]
    ],
    content: [
      '',
      [
        Validators.required,
        Validators.maxLength(150),
      ]
    ],
  })

  onSubmit(): void {
    if (this.form.valid) {

      const newComment: Comment = this.form.value;
      newComment.createdAt = new Date();
      newComment.postId = this.postId;

      this.commentService.createComment(newComment).subscribe({
        next: () => {
          this.snackbar.show('Post created successfully', 'success');
          this.cancel.emit(false);
        },
        error: (err) => {
          this.snackbar.show(
            err.status === 0 ? "Server is not responding" : "Failed to create post",
            'error'
          );
        }
      })

    } else {
      this.snackbar.show('Form submission failed! Please check your input', 'error');
    }
  }

  onCancel() {
    this.cancel.emit(false);
  }

}
