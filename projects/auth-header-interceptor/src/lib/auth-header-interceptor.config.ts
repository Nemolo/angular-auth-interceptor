import { InjectionToken } from '@angular/core';

/** InjectionToken for auth header iterceptor config */
export const AUTH_HEADER_INTERCEPTOR_CONFIG = new InjectionToken<AuthHeaderInterceptorConfig>('AUTH_HEADER_INTERCEPTOR_CONFIG');

export interface AuthHeaderInterceptorConfig {
  whiteList: Set<string>;
  failCallback: CallableFunction;
  tokenValidatorFunction: CallableFunction;
  refreshValidatorFunction: CallableFunction;
  logoutFunction: CallableFunction;
  removeTokenFunction: CallableFunction;
  refreshTokenFunction: CallableFunction;
  getTokenFunction: CallableFunction;
}

/** @docs-private */
export function AUTH_HEADER_INTERCEPTOR_CONFIG_FACTORY(): AuthHeaderInterceptorConfig {
  throw new Error('Need config');
}
