import { Observable } from 'rxjs';
import { SwapiCharacter, SwapiCharacterPage } from '../../../models/character.model';

export abstract class CharacterConnector {
  abstract getCharacters(page: number): Observable<SwapiCharacterPage>;
  abstract getCharacter(id: number): Observable<SwapiCharacter>;
  abstract getPlanet(id: string): Observable<any>;
  abstract getAkababCharacters(): Observable<any[]>
} 