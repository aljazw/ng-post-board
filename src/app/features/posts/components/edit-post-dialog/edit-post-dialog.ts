import { Component, inject, model } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { Post } from '../../post.model';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PostService } from '../../../../core/services/post.service';
import { SnackbarService } from '../../../../shared/services/snackbar.service';

@Component({
  selector: 'app-edit-post-dialog',
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  templateUrl: './edit-post-dialog.html',
  styleUrl: './edit-post-dialog.css',
})
export class EditPostDialog {
  readonly dialogRef = inject(MatDialogRef<EditPostDialog>);
  readonly data = inject<Post>(MAT_DIALOG_DATA);
  readonly post = model(this.data);
  readonly postService = inject(PostService);
  readonly snackbar = inject(SnackbarService);

  form: FormGroup = inject(FormBuilder).group({
    title: [
      this.data.title,
      [Validators.required, Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9 ]*$')],
    ],
    author: [
      this.data.author,
      [Validators.required, Validators.maxLength(15), Validators.pattern('^[a-zA-Z ]*$')],
    ],
    content: [this.data.content, [Validators.required, Validators.maxLength(150)]],
  });

  onSave(): void {
    if (this.form.valid && this.post()?.id != null) {
      const newPost: Post = this.form.value;
      newPost.createdAt = this.post().createdAt;

      const id = this.post()!.id!;

      this.postService.updatePost(id, newPost).subscribe({
        next: (createdPost) => {
          this.snackbar.show('Post edited successfully', 'success');
          this.dialogRef.close(createdPost);
        },
        error: (err) => {
          this.snackbar.show(
            err.status === 0 ? 'Server is not responding' : 'Failed to edit post',
            'error',
          );
        },
      });
    } else {
      this.snackbar.show('Form submission failed! Please check your input', 'error');
    }
  }
}
