import {
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  imports: [MatPaginatorModule, MatGridListModule, MatCardModule, FormsModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
})
export class HeroDetailComponent implements OnInit {
  @Input() id!: number;

  private heroService = inject(HeroService);
  public hero = signal<Hero | undefined>(undefined);

  ngOnInit() {
    this.hero.set(this.heroService.getHeroById(this.id));
  }
}
