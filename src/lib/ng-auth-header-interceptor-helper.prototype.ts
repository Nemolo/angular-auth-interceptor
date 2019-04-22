import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgAuthHeaderInterceptorHelperServiceInterface } from './ng-auth-header-interceptor-helper.service';

@Injectable({
  providedIn: 'root'
})
export abstract class NgAuthHeaderInterceptorHelperServicePrototype implements NgAuthHeaderInterceptorHelperServiceInterface {

  whiteListPrefix: string[];

  constructor() { }

  needAuth(request: HttpRequest<any>) {
    for (const prefix of this.whiteListPrefix) {
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
