import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SwapiCharacter, SwapiCharacterPage } from '../../../models/character.model';
import { CharacterConnector } from './character.connector';

@Injectable({ providedIn: 'root' })
export class CharacterMockConnector implements CharacterConnector {
  getCharacters(page: number): Observable<SwapiCharacterPage> {
    const mockResults: SwapiCharacter[] = [
      { name: 'Luke Skywalker', height: '172', mass: '77', hair_color: 'blond', skin_color: 'fair', eye_color: 'blue', birth_year: '19BBY', gender: 'male', homeworld: '', films: [], species: [], vehicles: [], starships: [], url: 'https://swapi.dev/api/people/1/' },
      { name: 'C-3PO', height: '167', mass: '75', hair_color: 'n/a', skin_color: 'gold', eye_color: 'yellow', birth_year: '112BBY', gender: 'n/a', homeworld: '', films: [], species: [], vehicles: [], starships: [], url: 'https://swapi.dev/api/people/2/' }
    ];
    return of({ count: 2, next: null, previous: null, results: mockResults }).pipe(delay(500));
  }

  getCharacter(id: number): Observable<SwapiCharacter> {
    return of({ name: 'Luke Skywalker', height: '172', mass: '77', hair_color: 'blond', skin_color: 'fair', eye_color: 'blue', birth_year: '19BBY', gender: 'male', homeworld: '', films: [], species: [], vehicles: [], starships: [], url: 'https://swapi.dev/api/people/1/' }).pipe(delay(500));
  }

  getPlanet(id: string): Observable<any> {
    return of({}).pipe(delay(500));
  }

  getAkababCharacters(): Observable<any[]> {
    return of([]).pipe(delay(500));
  }
} 