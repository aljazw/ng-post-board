import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from '../../post.model';
import { PostService } from '../../../../core/services/post.service';

@Component({
  selector: 'app-add-post-dialog',
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
],
  templateUrl: './add-post-dialog.html',
  styleUrl: './add-post-dialog.css',
})
export class AddPostDialog {

  readonly snackBar = inject(MatSnackBar);
  readonly dialogRef = inject(MatDialogRef<AddPostDialog>);
  readonly postService = inject(PostService);


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
          this.snackBar.open('Post created successfully', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['snackbar-success']
          });
          console.log(createdPost)

          this.dialogRef.close(createdPost);
        },
        error: (err) => {
           this.snackBar.open('Failed to create post', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['snackbar-error']
          });
          console.log("Failed to create post because: ", err)
        }
      })

    } else {
      this.snackBar.open('Form submission failed! Please check your input', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: 'snackbar-error'
      });
    }
  }
 

}
