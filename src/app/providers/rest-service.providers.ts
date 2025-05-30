import { Provider } from '@angular/core';
import { CharacterConnector, CharacterNetConnector } from './connectors/character';

export const REST_SERVICE_PROVIDERS: Provider[] = [
  { provide: CharacterConnector, useClass: CharacterNetConnector },
]; 