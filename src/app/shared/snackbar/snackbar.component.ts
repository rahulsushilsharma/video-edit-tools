import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  constructor(private _snackBar: MatSnackBar) { }

  public openSnackBar(message: string, action: string = 'ok', horizontalPosition: MatSnackBarHorizontalPosition = 'right', verticalPosition: MatSnackBarVerticalPosition = 'top', duration: number = 5000) {
    this._snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
    });
  }
}
