import { NgModule } from '@angular/core';
import { AuthHeaderInterceptorService } from './auth-header-interceptor.interceptor';
import {
  AuthHeaderInterceptorConfig,
  AuthHeaderInterceptorConfigService } from './auth-header-interceptor.config';
import { ModuleWithProviders } from '@angular/compiler/src/core';

@NgModule({
  declarations: [],
  imports: [],
  providers: [],
  exports: []
})
export class AuthHeaderInterceptorModule {
  static forRoot(config: AuthHeaderInterceptorConfig): ModuleWithProviders {
    return {
      ngModule: AuthHeaderInterceptorModule,
      providers: [
        AuthHeaderInterceptorService,
        {
          provide: AuthHeaderInterceptorConfigService,
          useValue: config
        }
      ]
    };
  }
}
