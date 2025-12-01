import { Component, inject, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Post } from '../../post.model';
import { PostService } from '../../../../core/services/post.service';
import { SnackbarService } from '../../../../shared/services/snackbar.service';

@Component({
  selector: 'app-delete-post-dialog',
  imports: [
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './delete-post-dialog.html',
  styleUrl: './delete-post-dialog.css',
})
export class DeletePostDialog {
  readonly postService = inject(PostService);
  readonly snackbar = inject(SnackbarService);
  readonly dialogRef = inject(MatDialogRef<DeletePostDialog>);
  readonly data = inject<Post>(MAT_DIALOG_DATA);
  readonly post = model(this.data);

  onDelete(): void {
    const postValue = this.post();

    if (!postValue.id) return;

    this.postService.deletePost(postValue.id).subscribe({
      next: () => {
        this.snackbar.show('Post deleted successfully');
        this.dialogRef.close();
      },
      error: (err) => {
        this.snackbar.show(
          err.status === 0 ? 'Server is not responding' : 'Failed to delete post',
          'error',
        );
      },
    });
  }
}
