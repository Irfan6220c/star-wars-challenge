import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { PlanetDetailComponent } from './planet-detail.component';
import { CharacterStore } from '../../stores/character/character.store';
import { ActivatedRoute } from '@angular/router';

describe('PlanetDetailComponent', () => {
  let fixture: ComponentFixture<PlanetDetailComponent>;
  let component: PlanetDetailComponent;
  let store: any;
  let route: ActivatedRoute;

  beforeEach(async () => {
    store = {
      loadPlanet: jest.fn().mockReturnValue(of({ name: 'Tatooine' })),
      planets: jest.fn().mockReturnValue({ 1: { name: 'Tatooine' } })
    };
    route = { snapshot: { paramMap: { get: () => '1' }, queryParamMap: { get: () => '1' } } } as any;

    await TestBed.configureTestingModule({
      imports: [PlanetDetailComponent],
      providers: [
        { provide: CharacterStore, useValue: store },
        { provide: ActivatedRoute, useValue: route }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(PlanetDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch planet details on init', () => {
    fixture.detectChanges();
    expect(store.loadPlanet).toHaveBeenCalledWith('1');
    expect(component.planet).toEqual({ name: 'Tatooine' });
  });
});
