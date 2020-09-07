import {HttpErrorInterceptor} from './http-error.interceptor';
import {createHttpFactory, HttpMethod, SpectatorHttp} from '@ngneat/spectator/jest';
import {async} from '@angular/core/testing';
import {of, throwError} from 'rxjs';
import {HttpErrorResponse, HttpRequest, HttpResponse} from '@angular/common/http';

describe('HttpErrorInterceptor', () => {

  let spectator: SpectatorHttp<HttpErrorInterceptor>;
  const createHttp = createHttpFactory({
    service: HttpErrorInterceptor
  });

  beforeEach(() => {
    spectator = createHttp();
  });

  test('Http error', async(() => {
    const mockHandler = {
      handle: jest.fn(() => throwError(
        new HttpErrorResponse({status: 500, error: {message: 'This is an error'}})))
    };
    spectator.service.intercept(new HttpRequest<unknown>(HttpMethod.GET, '/thing'), mockHandler)
      .subscribe((response) => {
        fail('Expected error');
      }, (error => {
        expect(error).toBeTruthy();
      }));

  }));

  test('Http success', async(() => {
    const mockHandler = {
      handle: jest.fn(() => of(new HttpResponse({status: 200})))
    };
    spectator.service.intercept(new HttpRequest<unknown>(HttpMethod.GET, '/thing'), mockHandler)
      .subscribe((response) => {
        expect(response).toBeTruthy();
      }, (error => {
        fail('Expected Successful');
      }));
  }));
});
