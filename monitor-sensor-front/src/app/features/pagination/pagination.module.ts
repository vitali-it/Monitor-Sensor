import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { PaginationComponent } from './pagination.component';

@NgModule({
    imports: [SharedModule],
    declarations: [PaginationComponent],
    exports: [PaginationComponent]
})
export class PaginationModule { }
