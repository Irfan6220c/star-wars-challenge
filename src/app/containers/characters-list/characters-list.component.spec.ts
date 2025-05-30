import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { CharactersListComponent } from './characters-list.component';
import { CharacterStore } from '../../stores/character/character.store';
import { ActivatedRoute, Router } from '@angular/router';

describe('CharactersListComponent', () => {
  let fixture: ComponentFixture<CharactersListComponent>;
  let component: CharactersListComponent;
  let store: any;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {
    store = {
      loadCharacters: jest.fn().mockReturnValue(of({ results: [{ name: 'Luke Skywalker' }] })),
      akababCharacters: jest.fn().mockReturnValue([]),
      characters: jest.fn().mockReturnValue(() => [{ name: 'Luke Skywalker', gender: 'male', birth_year: '19BBY', height: '172', mass: '77', url: 'https://swapi.dev/api/people/1/' }]),
      totalRecords: jest.fn().mockReturnValue(1),
      currentPage: jest.fn().mockReturnValue(1),
      loadAkababCharacters: jest.fn().mockReturnValue(of([])),
    };

    router = { navigate: jest.fn() } as any;
    route = { queryParams: of({ page: '1' }) } as any;

    await TestBed.configureTestingModule({
      imports: [CharactersListComponent],
      providers: [
        { provide: CharacterStore, useValue: store },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: route }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadCharacters on init if page not cached', () => {
    fixture.detectChanges();
    expect(store.loadCharacters).toHaveBeenCalledWith(1);
  });

  it('should navigate to page when paginator changes', () => {
    component.onPageChange(2);
    expect(router.navigate).toHaveBeenCalledWith([], {
      relativeTo: route,
      queryParams: { page: 2 },
      queryParamsHandling: 'merge',
    });
  });

  it('should navigate to character details', () => {
    const character = { url: 'https://swapi.dev/api/people/5/' };
    component.navigateToDetails(character);
    expect(router.navigate).toHaveBeenCalledWith(['/character-details', 5]);
  });

  it('should return Akabab image if found', () => {
    store.akababCharacters.mockReturnValue([{ name: 'Luke Skywalker', image: 'luke.png' }]);
    expect(component.getAkababImage('Luke Skywalker')).toBe('luke.png');
  });

  it('should return null if Akabab image not found', () => {
    store.akababCharacters.mockReturnValue([]);
    expect(component.getAkababImage('Unknown')).toBeNull();
  });

  it('should render character card in DOM', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.character-card')?.textContent).toContain('Luke Skywalker');
  });
});
