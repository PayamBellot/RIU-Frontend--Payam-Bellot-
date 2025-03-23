import { computed, Injectable, signal } from '@angular/core';
import { Hero } from '../models/hero';
import { HEROES } from '../db/heroes';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  public heroes = signal<Hero[]>(HEROES);
  public heroesList = signal<Hero[]>([]);
  private pageSize = signal<number>(12);
  private pageIndex = signal<number>(0);
  private filterName = signal<string>('');

  getAllHeroes = computed(() => this.heroes());

  filteredHeroes = computed(() => {
    const lowercasedFilter = this.filterName().toLowerCase();
    return this.heroes().filter(
      (hero) =>
        hero.firstName.toLowerCase().includes(lowercasedFilter) ||
        hero.lastName.toLowerCase().includes(lowercasedFilter) ||
        hero.alterEgo.toLowerCase().includes(lowercasedFilter) ||
        hero.universe.toLowerCase().includes(lowercasedFilter)
    );
  });

  paginatedHeroes = computed(() => {
    const filteredHeroes = this.filteredHeroes();
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    return filteredHeroes.slice(start, end);
  });

  totalHeroes = computed(() => this.filteredHeroes().length);

  totalPages = computed(() => Math.ceil(this.totalHeroes() / this.pageSize()));

  constructor() {
    this.heroesList.set(this.heroes());
  }

  getHeroById(id: number): Hero | undefined {
    const hero = this.heroesList().find((hero) => hero.id === Number(id));
    return hero;
  }

  addHero(newHero: Hero): void {
    const newId = this.heroes().length
      ? Math.max(...this.heroes().map((newHero) => newHero.id)) + 1
      : 1;
    newHero.id = newId;
    this.heroes.set([...this.heroes(), newHero]);
    this.heroesList.set(this.heroes());
  }

  updateHero(updatedHero: Hero): void {
    const index = this.heroes().findIndex((hero) => hero.id === updatedHero.id);
    if (index !== -1) {
      this.heroes.update((heroes) => {
        heroes[index] = updatedHero;
        return [...heroes];
      });
    }
  }

  updateFilter(filter: string): void {
    this.filterName.set(filter);
  }

  deleteHero(id: number): void {
    const heroes = this.heroes().filter((hero) => hero.id !== id);
    this.heroes.set(heroes);
    this.heroesList.set(this.heroes());
  }

  setPage(page: number): void {
    this.pageIndex.set(page);
  }

  setPageSize(size: number): void {
    this.pageSize.set(size);
  }

  filterHeroesByName(filter: string): Hero[] {
    const lowercasedFilter = filter.toLowerCase();
    return this.heroes().filter(
      (hero) =>
        hero.firstName.toLowerCase().includes(lowercasedFilter) ||
        hero.lastName.toLowerCase().includes(lowercasedFilter) ||
        hero.alterEgo.toLowerCase().includes(lowercasedFilter) ||
        hero.universe.toLowerCase().includes(lowercasedFilter)
    );
  }

  updateFilteredHeroes(filter: string): void {
    if (filter.trim() === '') {
      this.heroesList.set(this.heroes());
    } else {
      this.heroesList.set(this.filterHeroesByName(filter));
    }
  }
}
