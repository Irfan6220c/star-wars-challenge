import { signalStore, withState, withMethods, withHooks, getState, patchState } from '@ngrx/signals';
import { effect } from '@angular/core';

export interface CommonState {
  isLoading: boolean;
}

const initialState: CommonState = {
  isLoading: false
};

export const CommonStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withHooks({
    onInit(store) {
      effect(() => {
        // Persist state to localStorage
        localStorage.setItem('commonState', JSON.stringify(getState(store)));
      });
      // Initialize state from localStorage
      const savedState = localStorage.getItem('commonState');
      if (savedState) {
        patchState(store, () => ({ ...getState(store), ...JSON.parse(savedState) }));
      }
    }
  }),
  withMethods((store) => ({
    setLoading(isLoading: boolean): void {
      patchState(store, () => ({ isLoading }));
    }
  }))
); 