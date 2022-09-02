import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/auth/auth.service';
import { AuthRepository } from './core/auth/auth.repository';
import { AuthGuard } from './core/guard/auth.guard';
import { LoginGuard } from './core/guard/login.guard';
import { FormBuilder } from '@angular/forms';
import { HeaderModule } from './core/header/header.module';

@NgModule({
    imports: [CommonModule],
    providers: [AuthService, AuthRepository, FormBuilder, AuthGuard, LoginGuard, HeaderModule],
})
export class CoreModule {}
