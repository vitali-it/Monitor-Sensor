import { NgModule } from '@angular/core';
import { SharedModule } from '../../../app/shared.module';
import { SearchComponent } from './search.component';

@NgModule({
    imports: [SharedModule],
    declarations: [SearchComponent],
    exports: [SearchComponent],
})
export class SearchModule {}
