import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export const AuthHeaderInterceptorServiceInjector =
  new InjectionToken<NgAuthHeaderInterceptorHelperServiceInterface>('AUTH_HEADER_INTERCEPTOR_HELPER_SERVICE');

export interface NgAuthHeaderInterceptorHelperServiceInterface {
  needAuth(request: HttpRequest<any>): boolean;
  isTokenValid(): boolean;
  getClonedRequest(request: HttpRequest<any>): HttpRequest<any>;
  removeToken(): void;
  isRefreshValid(): boolean;
  logout(): void;
  refreshToken(): Observable<void>;
  getToken(): string;
}
