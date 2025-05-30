import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UrlService {
  // Only keep planet endpoints for SWAPI
  private base = 'https://swapi.dev/api';

  planets() {
    return `${this.base}/planets/`;
  }

  planet(id: number) {
    return `${this.base}/planets/${id}/`;
  }

  akababCharacters() {
    return 'https://akabab.github.io/starwars-api/api/all.json';
  }
} 