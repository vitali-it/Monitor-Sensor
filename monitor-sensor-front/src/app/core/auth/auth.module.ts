import { NgModule } from '@angular/core';
import { CoreModule } from '../../../app/core.module';
import { AuthFormComponent } from './auth.component-form';
import { AuthRoutingModule } from './auth.routing-module';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
    imports: [CoreModule, AuthRoutingModule, ReactiveFormsModule, SharedModule],
    declarations: [AuthFormComponent],
    providers: [FormBuilder],
})
export class AuthModule {}
