import { inject, Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private dialogRef: MatDialogRef<SpinnerComponent> | null = null;
  private dialog = inject(MatDialog);

  show(): void {
    if (!this.dialogRef) {
      this.dialogRef = this.dialog.open(SpinnerComponent, {
        disableClose: true,
        panelClass: 'spinner-dialog',
        backdropClass: 'transparent-backdrop',
      });
    }
  }

  hide(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }
}
