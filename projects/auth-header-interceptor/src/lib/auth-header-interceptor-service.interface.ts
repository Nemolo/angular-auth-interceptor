import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export const AuthHeaderInterceptorServiceInjector =
  new InjectionToken<AuthHeaderInterceptorServiceInterface>('AUTH_HEADER_INTERCEPTOR_SERVICE');

export interface AuthHeaderInterceptorServiceInterface {
  needAuth(request: HttpRequest<any>): boolean;
  isTokenValid(): boolean;
  getClonedRequest(request: HttpRequest<any>): HttpRequest<any>;
  removeToken(): void;
  isRefreshValid(): boolean;
  logout(): void;
  refreshToken(): Observable<void>;
  getToken(): string;
}

/** @docs-private */
export function AUTH_HEADER_INTERCEPTOR_SERVICE_FACTORY(): AuthHeaderInterceptorServiceInterface {
  throw new Error('Need config');
}
