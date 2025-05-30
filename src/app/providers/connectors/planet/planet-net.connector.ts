import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Planet } from '../../../models/planet.model';

@Injectable({ providedIn: 'root' })
export class PlanetNetConnector {
  private base = 'https://swapi.dev/api/planets';

  constructor(private http: HttpClient) {}

  getPlanets(): Observable<any> {
    return this.http.get<any>(`${this.base}/`);
  }

  getPlanet(id: number): Observable<Planet> {
    return this.http.get<Planet>(`${this.base}/${id}/`);
  }
} 