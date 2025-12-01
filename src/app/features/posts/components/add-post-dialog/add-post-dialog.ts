import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Post } from '../../post.model';
import { PostService } from '../../../../core/services/post.service';
import { SnackbarService } from '../../../../shared/services/snackbar.service';

@Component({
  selector: 'app-add-post-dialog',
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
],
  templateUrl: './add-post-dialog.html',
  styleUrl: './add-post-dialog.css',
})
export class AddPostDialog {

  readonly dialogRef = inject(MatDialogRef<AddPostDialog>);
  readonly postService = inject(PostService);
  readonly snackbar = inject(SnackbarService);


  form: FormGroup = inject(FormBuilder).group({
    title: [
      '',
      [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]
    ],
    author: [
      '',
      [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z ]*$')
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

  onCreate(): void {
    if (this.form.valid) {

      const newPost: Post = this.form.value;
      newPost.createdAt = new Date();

      this.postService.createPost(newPost).subscribe({
        next: (createdPost) => {
          this.snackbar.show('Post created successfully', 'success');
          this.dialogRef.close(createdPost);
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
 

}
