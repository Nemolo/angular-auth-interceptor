import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { switchMap, catchError, share } from 'rxjs/operators';
import {
  AuthHeaderInterceptorServiceInterface,
  AuthHeaderInterceptorServiceInjector
} from './auth-header-interceptor-service.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthHeaderInterceptor implements HttpInterceptor {

  authRequest: Observable<any>;

  constructor(
    @Inject(AuthHeaderInterceptorServiceInjector) protected authService: AuthHeaderInterceptorServiceInterface
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    if (this.authService.needAuth(request)) {
      if (this.authService.isTokenValid()) {
        return next.handle(this.authService.getClonedRequest(request))
          .pipe(
            catchError(err => {
              if (err.status === 401) {
                  this.authService.removeToken();
                  return this.refreshCall(request, next);
              } else {
                  return throwError(err);
              }
            })
          );
      } else if (this.authService.isRefreshValid()) {
        return this.refreshCall(request, next);
      } else {
        this.authService.logout();
        return throwError('Unauthorized');
      }
    }
    return next.handle(request);
  }

  protected refreshCall(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.authRequest) {
      this.authRequest = this.authService.refreshToken().pipe(
        catchError((err, caught) => {
          if (err.status === 401) {
            this.authService.logout();
            return of();
          } else {
            return throwError(err);
          }
        }),
        share()
      );
    }
    return this.authRequest.pipe(
      switchMap((obser: any, index: any) => {
        return next.handle(this.authService.getClonedRequest(request));
      })
    );
  }

}
