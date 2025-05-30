import { signalStore, withState, withMethods, withHooks, getState, patchState } from '@ngrx/signals';
import { inject, computed, effect } from '@angular/core';
import { SwapiCharacter, SwapiCharacterPage } from '../../models/character.model';
import { CharacterNetConnector } from '../../providers/connectors/character/character-net.connector';
import { Observable, of, tap } from 'rxjs';
import { Planet } from 'src/app/models/planet.model';

export interface CharacterState {
  charactersByPage: { [page: number]: SwapiCharacter[] };
  totalRecords: number;
  currentPage: number;
  loading: boolean;
  currentCharacter: SwapiCharacter | null;
  akababCharacters: any[];
  planets: { [id: string]: any };
  characterById: { [id: number]: SwapiCharacter };
}

const initialState: CharacterState = {
  charactersByPage: {},
  totalRecords: 0,
  currentPage: 1,
  loading: false,
  currentCharacter: null,
  akababCharacters: [],
  planets: {},
  characterById: {}
};

export const CharacterStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withHooks({
    onInit: (store) => {
        effect(() => {
        const state = getState(store);
        console.log('state', state);
        })
    }
  }),  
  withMethods((store, connector = inject(CharacterNetConnector)) => ({
    loadCharacters(page: number): Observable<SwapiCharacterPage> {
        const state = getState(store);
        const cached = state.charactersByPage?.[page];
      
        if (cached && cached.length > 0) {
          patchState(store, () => ({ currentPage: page }));
          return of({
            results: cached,
            count: state.totalRecords,
            next: null,
            previous: null
          });
        }
      
        // Otherwise, fetch from API
        patchState(store, () => ({ loading: true }));
      
        return connector.getCharacters(page).pipe(
          tap((pageData) => {
            patchState(store, (state) => ({
              charactersByPage: { ...state.charactersByPage, [page]: pageData.results },
              totalRecords: pageData.count,
              currentPage: page,
              loading: false,
            }));
          })
        );
      },
      loadCharacter(id: number): Observable<SwapiCharacter> {
        const state = getState(store);
        const cached = state.characterById?.[id];
      
        if (cached) {
          // Return cached character
          patchState(store, () => ({
            currentCharacter: cached,
            loading: false
          }));
          return of(cached);
        }
      
        patchState(store, () => ({ loading: true }));
      
        return connector.getCharacter(id).pipe(
          tap((character) => {
            patchState(store, (state) => ({
              currentCharacter: character,
              loading: false,
              characterById: {
                ...state.characterById,
                [id]: character
              }
            }));
          })
        );
      },
    loadAkababCharacters(): Observable<any[]> {
      patchState(store, () => ({ loading: true }));
      return connector.getAkababCharacters().pipe(
        tap((characters) => {
          patchState(store, () => ({
            akababCharacters: characters,
            loading: false
          }));
        })
      );
    },
    loadPlanet(id: string): Observable<any> {
        const state = getState(store);
        const cached = state.planets?.[id];
      
        if (cached) {
          // Planet is already in state; return it without fetching
          patchState(store, () => ({
            loading: false
          }));
          return of(cached);
        }
      
        // Not in cache: fetch from API
        patchState(store, () => ({ loading: true }));
      
        return connector.getPlanet(id).pipe(
          tap((planet) => {
            patchState(store, (state) => ({
              planets: {
                ...state.planets,
                [id]: planet
              },
              loading: false
            }));
          })
        );
      }
      ,
    characters: (page: number) => computed(() => getState(store).charactersByPage[page] || []),
    totalRecords: computed(() => getState(store).totalRecords),
    currentPage: computed(() => getState(store).currentPage),
    loading: computed(() => getState(store).loading),
    currentCharacter: computed(() => getState(store).currentCharacter),
    akababCharacters: computed(() => getState(store).akababCharacters),
    planets: computed(() => getState(store).planets)
  }))
); 