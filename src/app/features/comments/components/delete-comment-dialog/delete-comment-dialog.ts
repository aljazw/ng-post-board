import { Component, inject, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CommentService } from '../../../../core/services/comment.service';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { Comment } from '../../comment.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-comment-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogClose,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './delete-comment-dialog.html',
  styleUrl: './delete-comment-dialog.css',
})
export class DeleteCommentDialog {
  readonly commentService = inject(CommentService);
  readonly snackbar = inject(SnackbarService);
  readonly dialogRef = inject(MatDialogRef<DeleteCommentDialog>);
  readonly data = inject<Comment>(MAT_DIALOG_DATA);
  readonly comment = model(this.data);

  onDelete(): void {
    const commentValue = this.comment();

    if (!commentValue.id) return;

    this.commentService.deleteComment(commentValue.id).subscribe({
      next: () => {
        this.snackbar.show('Comment deleted successfully');
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.snackbar.show(
          err.status === 0 ? 'Server is not responding' : 'Failed to delete comment',
          'error',
        );
      },
    });
  }
}
