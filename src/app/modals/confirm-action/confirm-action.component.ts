import { Component, inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialog,
} from '@angular/material/dialog';
import { Hero } from '../../models/hero';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-confirm-action',
  imports: [MatDialogModule],
  templateUrl: './confirm-action.component.html',
  styleUrl: './confirm-action.component.scss',
})
export class ConfirmActionComponent {
  public dialogRef = inject(MatDialogRef<ConfirmActionComponent>);
  private spinner = inject(SpinnerService);
  public dialog = inject(MatDialog);
  data = inject(MAT_DIALOG_DATA);
  hero: Hero;

  constructor() {
    this.hero = { ...this.data.hero };
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.dialogRef.close(this.hero);
    }, 3000);
  }
}
