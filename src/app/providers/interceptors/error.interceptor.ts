import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error from API', error);
      return throwError(() => error);
    })
  );
} 