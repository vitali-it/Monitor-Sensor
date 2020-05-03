import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ValidationPipe } from './core/pipe/validation.pipe';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { GlobalErrorHandler } from './core/interceptor/global-error.handler';
import { RoleGuard } from './core/guard/role.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [ValidationPipe],
  exports: [
    CommonModule,
    ValidationPipe
  ],
  providers: [
    RoleGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  },
  {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalErrorHandler,
      multi: true
  }
  ]
})
export class SharedModule { }
