import { NgModule } from '@angular/core';
import { AuthHeaderInterceptorService } from './auth-header-interceptor.interceptor';
import { AUTH_HEADER_INTERCEPTOR_CONFIG, AUTH_HEADER_INTERCEPTOR_CONFIG_FACTORY } from './auth-header-interceptor.config';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    AUTH_HEADER_INTERCEPTOR_CONFIG_FACTORY
  ],
  exports: [ AuthHeaderInterceptorService ]
})
export class AuthHeaderInterceptorModule { }
