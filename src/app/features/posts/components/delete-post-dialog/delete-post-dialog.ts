import { Component, inject, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Post } from '../../post.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-post-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './delete-post-dialog.html',
  styleUrl: './delete-post-dialog.css',
})
export class DeletePostDialog {

  readonly dialogRef = inject(MatDialogRef<DeletePostDialog>);
  readonly snackBar = inject(MatSnackBar);
  readonly data = inject<Post>(MAT_DIALOG_DATA);
  readonly post = model(this.data)


  onDelete(): void {
    this.snackBar.open('Post deleted successfully', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    this.dialogRef.close();
  }
}
