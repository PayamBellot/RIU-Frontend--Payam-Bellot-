import { Component, inject } from '@angular/core';
import { Hero } from '../../models/hero';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UppercaseDirective } from '../../directives/uppercase.directive';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-add-hero',
  imports: [
    UppercaseDirective,
    MatDialogContent,
    MatFormField,
    MatLabel,
    FormsModule,
    MatDialogActions,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [MatDialogRef],
  templateUrl: './add-hero.component.html',
  styleUrl: './add-hero.component.scss',
})
export class AddHeroComponent {
  public dialogRef = inject(MatDialogRef<AddHeroComponent>);
  private spinner = inject(SpinnerService);
  data = inject(MAT_DIALOG_DATA);
  hero: Hero;

  constructor() {
    if (this.data.hero) {
      this.hero = { ...this.data.hero };
    } else {
      this.hero = {
        id: 0,
        firstName: '',
        lastName: '',
        alterEgo: '',
        universe: '',
        image: '',
      };
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
    this.dialogRef.close(this.hero);
  }
}
