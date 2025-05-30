import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SwapiCharacter, SwapiCharacterPage } from '../../../models/character.model';
import { UrlService } from '../../../services/url.service';

@Injectable({ providedIn: 'root' })
export class CharacterNetConnector {
  private base = 'https://swapi.dev/api/people';

  constructor(private http: HttpClient, private url: UrlService) {}

  getCharacters(page: number): Observable<SwapiCharacterPage> {
    return this.http.get<SwapiCharacterPage>(`${this.base}/?page=${page}`);
  }

  getCharacter(id: number): Observable<SwapiCharacter> {
    return this.http.get<SwapiCharacter>(`${this.base}/${id}/`);
  }

  getAkababCharacters(): Observable<any[]> {
    return this.http.get<any[]>(this.url.akababCharacters());
  }

  getPlanet(id: string): Observable<any> {
    return this.http.get<any>(`https://swapi.dev/api/planets/${id}/`);
  }
} 