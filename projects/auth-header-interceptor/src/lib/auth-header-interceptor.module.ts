import { NgModule } from '@angular/core';
import { AuthHeaderInterceptor } from './auth-header-interceptor.interceptor';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    AuthHeaderInterceptor,
  ]
})
export class AuthHeaderInterceptorModule { }
