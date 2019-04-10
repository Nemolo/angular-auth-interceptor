import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap, catchError, share } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

  authRequest: Observable<any>;

  constructor(
    private whiteList: string[],
    private failCallback: CallableFunction,
    private tokenValidatorFunction: CallableFunction,
    private removeTokenFunction: CallableFunction,
    private router: Router
    ) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    if (this.needsAuth(request.url)) {
      if (this.tokenValidatorFunction()) {
        return next.handle(this.getClonedRequest(request))
          .pipe(
            catchError(err => {
              if (err.status === 401) {
                  this.removeTokenFunction();
                  return this.refreshCall(request, next);
              } else {
                  return throwError(err);
              }
            })
          );
      } else if (this.authHelper.getRefreshToken()) {
        return this.refreshCall(request, next);
      } else {
        this.authService.logout();
        this.router.navigateByUrl('/account/login');
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
            this.router.navigateByUrl('/login');
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
    if (url.startsWith(environment.endpoint)) {
      for (const oneUrl of this.whiteList) {
        if ((environment.endpoint + oneUrl) === url) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  protected getClonedRequest(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authHelper.getToken()}`
      }
    });
  }
}
