import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

/**
 * Intercepts HttpRequests and logs any http responses of 3xx+
 * In the future we can make this a conditional retry based on the status code.
 *
 */
@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap(() => {}),
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error && error.error.message) {
            console.log('status: ' + error.status + '\nmessage: ' + error.error.message);
          } else {
            console.log(error);
          }
        }
        return throwError(error);
      })
    );
  }
}
