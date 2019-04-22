import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AuthHeaderInterceptorServiceInterface, AuthHeaderInterceptorServiceInjector } from './auth-header-interceptor-service.interface';

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
        {
          provide: AuthHeaderInterceptorServiceInjector,
          useValue: authService
        }
      ]
    };
  }
}
