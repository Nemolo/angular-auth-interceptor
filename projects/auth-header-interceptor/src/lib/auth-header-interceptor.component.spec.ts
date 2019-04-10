import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthHeaderInterceptorComponent } from './auth-header-interceptor.component';

describe('AuthHeaderInterceptorComponent', () => {
  let component: AuthHeaderInterceptorComponent;
  let fixture: ComponentFixture<AuthHeaderInterceptorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthHeaderInterceptorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthHeaderInterceptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
