import { Component, inject, model } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogRef, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { Post } from '../../post.model';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatDialogTitle
],
  templateUrl: './edit-post-dialog.html',
  styleUrl: './edit-post-dialog.css',
})
export class EditPostDialog {

  readonly snackBar = inject(MatSnackBar);
  readonly dialogRef = inject(MatDialogRef<EditPostDialog>);
  readonly data = inject<Post>(MAT_DIALOG_DATA);
  readonly post = model(this.data)

  form: FormGroup = inject(FormBuilder).group({
    title: [
      this.data.title,
      [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]
    ],
    author: [
      this.data.author,
      [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z ]*$')
      ]
    ],
    content: [
      this.data.content,
      [
        Validators.required,
        Validators.maxLength(150),
      ]
    ],
  })

  onSave(): void {
    if (this.form.valid) {
      this.snackBar.open('Form submitted successfully', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['snackbar-success']
      });
      this.dialogRef.close();
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
