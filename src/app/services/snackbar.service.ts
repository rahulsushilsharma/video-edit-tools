import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  public openSnackBar(message: string, action: string = 'ok', horizontalPosition: MatSnackBarHorizontalPosition = 'right', verticalPosition: MatSnackBarVerticalPosition = 'top', duration: number = 5000) {
    this._snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
    });
  }
}
