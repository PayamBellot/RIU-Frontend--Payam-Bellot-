import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { Hero } from '../models/hero';
import { HEROES } from '../db/heroes';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AddHeroComponent } from '../modals/add-hero/add-hero.component';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, FormsModule],
      providers: [
        HeroService,
        { provide: MatDialogRef, useValue: { afterClosed: () => of({}) } },
      ],
    }).compileComponents();
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all heroes', () => {
    expect(service.getAllHeroes()).toEqual(HEROES);
  });

  it('should filter heroes by name', () => {
    service.updateFilter('Bruce');
    expect(service.filteredHeroes().length).toBeGreaterThan(0);
    expect(
      service
        .filteredHeroes()
        .every(
          (hero) =>
            hero.firstName.includes('Bruce') ||
            hero.lastName.includes('Wayne') ||
            hero.alterEgo.includes('Batman') ||
            hero.universe.includes('DC')
        )
    ).toBeTrue();
  });

  it('should return paginated heroes', () => {
    service.setPageSize(5);
    service.setPage(0);
    expect(service.paginatedHeroes().length).toBe(5);

    service.setPage(1);
    expect(service.paginatedHeroes().length).toBe(5);
  });

  it('should return the correct total number of heroes', () => {
    expect(service.totalHeroes()).toBe(HEROES.length);

    service.updateFilter('Wayne');
    expect(service.totalHeroes()).toBeGreaterThan(0);
  });

  it('should add a new hero', () => {
    const newHero: Hero = {
      id: 0,
      firstName: 'Peter',
      lastName: 'Parker',
      alterEgo: 'Spider-Man',
      universe: 'Marvel',
      image: '',
    };
    service.addHero(newHero);
    expect(service.getAllHeroes().length).toBe(HEROES.length + 1);
    expect(service.getHeroById(newHero.id)).toEqual(newHero);
  });

  it('should update an existing hero', () => {
    const heroToUpdate = { ...HEROES[0], firstName: 'Updated Name' };
    service.updateHero(heroToUpdate);

    const updatedHero = service.getHeroById(heroToUpdate.id);
    expect(updatedHero?.firstName).toBe('Updated Name');
  });

  it('should delete a hero', () => {
    const initialLength = service.getAllHeroes().length;
    const heroIdToDelete = HEROES[0].id;

    service.deleteHero(heroIdToDelete);

    expect(service.getAllHeroes().length).toBe(initialLength - 1);
    expect(service.getHeroById(heroIdToDelete)).toBeUndefined();
  });

  it('should set the filter correctly', () => {
    service.updateFilter('Clark');
    expect(
      service
        .filteredHeroes()
        .every(
          (hero) =>
            hero.firstName.includes('Clark') ||
            hero.lastName.includes('Kent') ||
            hero.alterEgo.includes('Superman') ||
            hero.universe.includes('DC')
        )
    ).toBeTrue();
  });

  it('should set the page index correctly', () => {
    service.setPage(2);
    expect(service['pageIndex']()).toBe(2);
  });

  it('should set the page size correctly', () => {
    service.setPageSize(10);
    expect(service['pageSize']()).toBe(10);
  });
});
