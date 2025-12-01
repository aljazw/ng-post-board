import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {

  readonly snackBar = inject(MatSnackBar)


  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const duration = 5000;
    let panelClass: string[] | undefined;

    switch (type) {
      case 'success':
        panelClass = ['snackbar-success'];
        break;
      case 'error':
        panelClass = ['snackbar-error'];
        break;
      case 'info':
        panelClass = undefined;
        break;
    }

    this.snackBar.open(message, 'Close', {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass
    });
  }
  
}
