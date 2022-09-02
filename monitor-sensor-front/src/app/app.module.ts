import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core.module';
import { SharedModule } from './shared.module';
import { NgxsModule } from '@ngxs/store';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, RouterModule, AppRoutingModule, CoreModule, SharedModule, NgxsModule.forRoot()],
    bootstrap: [AppComponent],
})
export class AppModule {}
