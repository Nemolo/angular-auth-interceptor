import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap, catchError, share } from 'rxjs/operators';
import { AuthHeaderInterceptorConfig } from './auth-header-interceptor.config';

@Injectable({
  providedIn: 'root'
})
export class AuthHeaderInterceptorService implements HttpInterceptor {

  authRequest: Observable<any>;

  constructor(
    private config: AuthHeaderInterceptorConfig
    ) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    if (this.needsAuth(request.url)) {
      if (this.config.tokenValidatorFunction()) {
        return next.handle(this.getClonedRequest(request))
          .pipe(
            catchError(err => {
              if (err.status === 401) {
                  this.config.removeTokenFunction();
                  return this.refreshCall(request, next);
              } else {
                  return throwError(err);
              }
            })
          );
      } else if (this.config.refreshValidatorFunction()) {
        return this.refreshCall(request, next);
      } else {
        this.config.logoutFunction();
        return throwError('Unauthorized');
      }
    }
    return next.handle(request);
  }

  protected refreshCall(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.authRequest) {
      this.authRequest = this.config.refreshTokenFunction().pipe(
        catchError((err, caught) => {
          if (err.status === 401) {
            this.config.logoutFunction();
            return next.handle(request);
          } else {
            return throwError(err);
          }
        }),
        share()
      );
    }
    return this.authRequest.pipe(
      switchMap((obser: any, index: any) => {
        return next.handle(this.getClonedRequest(request));
      })
    );
  }

  needsAuth(url) {
    // no auth
    return !this.config.whiteList.has(url);
    // if (url.startsWith(environment.endpoint)) {
    //   for (const oneUrl of this.whiteList) {
    //     if ((environment.endpoint + oneUrl) === url) {
    //       return false;
    //     }
    //   }
    //   return true;
    // }
    // return false;
  }

  protected getClonedRequest(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.config.getTokenFunction()}`
      }
    });
  }
}
