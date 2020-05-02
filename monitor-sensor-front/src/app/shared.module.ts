import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ValidationPipe } from './core/pipe/validation.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [ValidationPipe],
  exports: [
    CommonModule,
    ValidationPipe
  ]
})
export class SharedModule { }
