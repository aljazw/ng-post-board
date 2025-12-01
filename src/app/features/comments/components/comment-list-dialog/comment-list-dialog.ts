import { Component, inject, model, signal, WritableSignal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommentService } from '../../../../core/services/comment.service';
import { Comment } from '../../comment.model';
import { Post } from '../../../posts/post.model';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { CommentItem } from "../comment-item/comment-item";
import { MatButtonModule } from '@angular/material/button';
import { CreateCommentForm } from "../create-comment-form/create-comment-form";
import { DeleteCommentDialog } from '../delete-comment-dialog/delete-comment-dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-comment-list-dialog',
  imports: [
    MatDialogModule,
    MatIconModule,
    CommentItem,
    MatButtonModule,
    CreateCommentForm,
    MatDialogTitle,
    MatProgressSpinnerModule,
],
  templateUrl: './comment-list-dialog.html',
  styleUrl: './comment-list-dialog.css',
})
export class CommentListDialog {

  readonly dialog = inject(MatDialog);
  readonly commentService = inject(CommentService);
  readonly snackbar = inject(SnackbarService);
  readonly data = inject<Post>(MAT_DIALOG_DATA);
  readonly post = model(this.data);

  comments: WritableSignal<Comment[]> = signal([]);
  showForm = signal(false);
  loading = signal(false);



  ngOnInit(): void {
    this.loadComments();
  }

  onCreate() {
    this.showForm.set(true);
  }

  onChildrenCancelled(value: boolean) {
    if (value === false) {
      this.showForm.set(false);
      this.loadComments();
    }
  }

  loadComments(): void {
    this.loading.set(true);
    const id = this.post()?.id ?? null;

    if (id === null) return;

    this.commentService.getComments(id).subscribe({
      next: (data: Comment[]) => {
        this.comments.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.snackbar.show(
          err.status === 0
            ? "Server is not responding"
            : "Failed to load comments",
          'error'
        );
        this.loading.set(false);
      }
    });
  }

  openDeleteDialog(comment: Comment) {
    const dialogRef = this.dialog.open(DeleteCommentDialog, {
      data: { ...comment }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'no-reload') {
        this.loadComments();
      }
    });
  }


}
