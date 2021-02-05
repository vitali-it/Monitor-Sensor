import { HeaderComponent } from './header.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [HeaderComponent],
    exports: [HeaderComponent]
})
export class HeaderModule { }
