import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

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
