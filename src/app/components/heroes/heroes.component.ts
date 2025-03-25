import { Component, computed, inject, signal } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Hero } from '../../models/hero';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddHeroComponent } from '../../modals/add-hero/add-hero.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-heroes',
  imports: [
    MatDialogModule,
    MatPaginatorModule,
    MatGridListModule,
    MatCardModule,
    MatIcon,
    FormsModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
  ],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent {
  public heroService = inject(HeroService);
  public dialog = inject(MatDialog);
  public router = inject(Router);

  public filterName = signal<string>('');
  public pageIndex = signal<number>(0);
  public pageSize = signal<number>(12);

  filteredHeroes = computed(() => {
    return this.heroService.filterHeroesByName(this.filterName());
  });

  paginatedHeroes = computed(() => this.heroService.paginatedHeroes());

  totalHeroes = computed(() => this.heroService.totalHeroes());

  totalPages = computed(() => this.heroService.totalPages());

  onFilterChange(event: Event): void {
    const searchFilter = (event.target as HTMLInputElement).value;
    this.filterName.set(searchFilter);
    this.heroService.updateFilter(searchFilter);
  }

  addHero() {
    const dialogRef = this.dialog.open(AddHeroComponent, {
      data: { hero: null },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.heroService.addHero(result);
      }
    });
  }

  viewHeroDetail(hero: Hero) {
    this.router.navigate(['/hero-detail', hero.id]);
  }

  editHero(hero: Hero) {
    const dialogRef = this.dialog.open(AddHeroComponent, {
      data: { hero: hero },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.heroService.updateHero(result);
      }
    });
  }

  deleteHero(hero: Hero) {
    const confirmDelete = confirm('Are you sure you want to delete this hero?');
    if (confirmDelete) {
      this.heroService.deleteHero(hero.id);
      alert('Hero deleted successfully');
    }
  }

  onPageChange(event: any) {
    this.pageIndex.set(event.pageIndex);
    this.heroService.setPage(event.pageIndex);
  }
}
