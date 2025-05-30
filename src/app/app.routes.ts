import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./containers/characters-list/characters-list.component')
      .then(m => m.CharactersListComponent)
  },
  {
    path: 'character-details/:id',
    loadComponent: () => import('./containers/characters-detail/characters-detail.component')
      .then(m => m.CharactersDetailComponent)
  },
  {
    path: 'planet-detail/:id',
    loadComponent: () => import('./containers/planet-detail/planet-detail.component')
      .then(m => m.PlanetDetailComponent)
  }
];
