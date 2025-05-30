import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CharactersDetailComponent } from './characters-detail.component';
import { CharacterStore } from '../../stores/character/character.store';
import { SwapiCharacter } from 'src/app/models/character.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({ selector: 'a[routerLink]', template: '<ng-content></ng-content>', standalone: true })
class MockRouterLinkA {}
@Component({ selector: 'button[routerLink]', template: '<ng-content></ng-content>', standalone: true })
class MockRouterLinkButton {}

const mockCharacter: SwapiCharacter = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'https://swapi.dev/api/planets/1/',
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  url: 'https://swapi.dev/api/people/1/'
};

describe('CharactersDetailComponent', () => {
  let fixture: ComponentFixture<CharactersDetailComponent>;
  let component: CharactersDetailComponent;
  let store: any;

  beforeEach(async () => {
    store = {
      loadCharacter: jest.fn().mockReturnValue(of(mockCharacter)),
      akababCharacters: jest.fn().mockReturnValue([{ name: 'Luke Skywalker', image: 'luke.png' }])
    };

    await TestBed.configureTestingModule({
      imports: [
        CharactersDetailComponent,
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatListModule,
        MatDividerModule,
        MatIconModule,
        RouterModule,
        MockRouterLinkA,
        MockRouterLinkButton
      ],
      providers: [
        { provide: CharacterStore, useValue: store },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }
        },
        { provide: Router, useValue: { navigate: jest.fn() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return Akabab image if found', () => {
    expect(component.getAkababImage('Luke Skywalker')).toBe('luke.png');
  });

  it('should return placeholder image if Akabab not found', () => {
    store.akababCharacters.mockReturnValue([]);
    expect(component.getAkababImage('Unknown')).toBe('assets/placeholder.png');
  });

  it('should extract planet id from homeworld url', () => {
    expect(component.getPlanetId('https://swapi.dev/api/planets/1/')).toBe('1');
  });

  it('should extract character id from url', () => {
    expect(component.getCharacterId('https://swapi.dev/api/people/1/')).toBe('1');
  });

  it('should map character details correctly', () => {
    const details = component['mapCharacterDetails'](mockCharacter);
    expect(details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: 'Height', value: '172 cm', icon: 'height' }),
        expect.objectContaining({ label: 'Mass', value: '77 kg', icon: 'fitness_center' })
      ])
    );
  });

  it('should return null for invalid planet url', () => {
    expect(component.getPlanetId('invalid-url')).toBeNull();
  });

  it('should return null for invalid character url', () => {
    expect(component.getCharacterId('invalid-url')).toBeNull();
  });
});
