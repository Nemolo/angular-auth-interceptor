import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { AuthHeaderInterceptorServiceInterface } from './auth-header-interceptor-service.interface';
import { Observable } from 'rxjs';
import { Route } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export abstract class AuthHeaderInterceptorServicePrototype implements AuthHeaderInterceptorServiceInterface {

  whiteListPrefix: string[];

  constructor( ) { }

  needAuth(request: HttpRequest<any>) {
    for (const prefix in this.whiteListPrefix) {
      if (request.url.startsWith(prefix)) {
        return false;
      }
    }
    return true;
  }

  getClonedRequest(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });
  }

  abstract getToken(): string;
  abstract isTokenValid(): boolean;
  abstract removeToken(): void;
  abstract isRefreshValid(): boolean;
  abstract logout(): void;
  abstract refreshToken(): Observable<void>;
}
