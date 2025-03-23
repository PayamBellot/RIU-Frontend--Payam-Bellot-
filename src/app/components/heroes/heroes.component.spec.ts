import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../../services/hero.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Hero } from '../../models/hero';
import { AddHeroComponent } from '../../modals/add-hero/add-hero.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroService: jasmine.SpyObj<HeroService>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const heroServiceSpy = jasmine.createSpyObj('HeroService', [
      'filterHeroesByName',
      'updateFilter',
      'addHero',
      'updateHero',
      'deleteHero',
      'setPage',
      'paginatedHeroes',
      'totalHeroes',
      'totalPages',
    ]);

    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatGridListModule,
        MatCardModule,
        MatPaginatorModule,
        MatDialogModule,
        HeroesComponent,
      ],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should filter heroes on filter change', () => {
    const mockEvent = { target: { value: 'Super' } } as any;
    heroService.filterHeroesByName.and.returnValue([]);
    component.onFilterChange(mockEvent);
    expect(heroService.updateFilter).toHaveBeenCalledWith('Super');
  });

  it('should navigate to hero detail', () => {
    const mockHero: Hero = {
      id: 1,
      firstName: 'Clark',
      lastName: 'Kent',
      alterEgo: 'Superman',
      universe: 'DC',
      image: 'superman.png',
    };
    component.viewHeroDetail(mockHero);
    expect(router.navigate).toHaveBeenCalledWith(['/hero-detail', 1]);
  });

  it('should open dialog to add a new hero', () => {
    const dialogRefSpy = {
      afterClosed: () =>
        of({
          firstName: 'Bruce',
          lastName: 'Wayne',
          alterEgo: 'Batman',
          universe: 'DC',
          image: 'batman.png',
        }),
    };
    dialog.open.and.returnValue(dialogRefSpy as any);

    component.addHero();
    expect(dialog.open).toHaveBeenCalledWith(AddHeroComponent, {
      data: { hero: null },
    });
    expect(heroService.addHero).toHaveBeenCalled();
  });

  it('should open dialog to edit a hero', () => {
    const mockHero: Hero = {
      id: 1,
      firstName: 'Bruce',
      lastName: 'Wayne',
      alterEgo: 'Batman',
      universe: 'DC',
      image: 'batman.png',
    };
    const dialogRefSpy = { afterClosed: () => of(mockHero) };
    dialog.open.and.returnValue(dialogRefSpy as any);

    component.editHero(mockHero);
    expect(dialog.open).toHaveBeenCalledWith(AddHeroComponent, {
      data: { hero: mockHero },
    });
    expect(heroService.updateHero).toHaveBeenCalledWith(mockHero);
  });

  it('should confirm and delete a hero', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const mockHero: Hero = {
      id: 2,
      firstName: 'Diana',
      lastName: 'Prince',
      alterEgo: 'Wonder Woman',
      universe: 'DC',
      image: 'wonder_woman.png',
    };

    component.deleteHero(mockHero);
    expect(heroService.deleteHero).toHaveBeenCalledWith(2);
  });

  it('should handle pagination correctly', () => {
    const mockEvent = { pageIndex: 1 };
    component.onPageChange(mockEvent);
    expect(heroService.setPage).toHaveBeenCalledWith(1);
  });
});
