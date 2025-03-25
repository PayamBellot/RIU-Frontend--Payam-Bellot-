import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  imports: [MatDialogModule],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
})
export class ConfirmComponent {
  public dialogRef = inject(MatDialogRef<ConfirmComponent>);
  data = inject(MAT_DIALOG_DATA);
  msg: string;

  constructor() {
    this.msg = this.data.msg;
  }

  confirm(): void {
    this.dialogRef.close();
  }
}
