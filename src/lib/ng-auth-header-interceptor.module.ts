import { NgModule } from '@angular/core';
import {
  NgAuthHeaderInterceptorHelperServiceInterface,
  AuthHeaderInterceptorServiceInjector
} from './ng-auth-header-interceptor-helper.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class NgAuthHeaderInterceptorModule {
  static forRoot(authService: NgAuthHeaderInterceptorHelperServiceInterface): ModuleWithProviders {
    return {
      ngModule: NgAuthHeaderInterceptorModule,
      providers: [
        {
          provide: AuthHeaderInterceptorServiceInjector,
          useValue: authService
        }
      ]
    };
  }
}
