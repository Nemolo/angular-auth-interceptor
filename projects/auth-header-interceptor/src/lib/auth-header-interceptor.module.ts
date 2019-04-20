import { NgModule } from '@angular/core';
import {
  AuthHeaderInterceptorConfigService } from './auth-header-interceptor.config';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AuthHeaderInterceptorService } from './auth-header-interceptor.service';
import { AuthHeaderInterceptorServiceInterface } from './auth-header-interceptor-service.interface';

@NgModule({
  declarations: [],
  imports: [],
  providers: [],
  exports: []
})
export class AuthHeaderInterceptorModule {
  static forRoot(authService: AuthHeaderInterceptorServiceInterface): ModuleWithProviders {
    return {
      ngModule: AuthHeaderInterceptorModule,
      providers: [
        AuthHeaderInterceptorService,
        {
          provide: AuthHeaderInterceptorServiceInterface,
          useValue: authService
        }
      ]
    };
  }
}
