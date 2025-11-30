import { Component, inject, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Post } from '../../post.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from '../../../../core/services/post.service';

@Component({
  selector: 'app-delete-post-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './delete-post-dialog.html',
  styleUrl: './delete-post-dialog.css',
})
export class DeletePostDialog {

  readonly postService = inject(PostService);
  readonly dialogRef = inject(MatDialogRef<DeletePostDialog>);
  readonly snackBar = inject(MatSnackBar);
  readonly data = inject<Post>(MAT_DIALOG_DATA);
  readonly post = model(this.data)


  onDelete(): void {
    const postValue = this.post();

    if (!postValue.id) return;

    this.postService.deletePost(postValue.id).subscribe({
      next: () => {
        this.snackBar.open('Post deleted successfully', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        const message = err?.message || 'Failed to delete post';
        this.snackBar.open(message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-error'],
        });
      },
    });
  }

}
