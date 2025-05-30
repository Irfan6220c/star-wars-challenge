import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CommonStore } from 'src/app/stores/common/common.store';

let totalRequests = 0;

export function loadingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const commonStore = inject(CommonStore);

  if (totalRequests === 0) {
    commonStore.setLoading(true);
  }

  totalRequests++;

  return next(req).pipe(
    finalize(() => {
      totalRequests--;
      if (totalRequests === 0) {
        commonStore.setLoading(false);
      }
    })
  );
} 