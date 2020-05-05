import { NgModule } from '@angular/core';
import { SensorService } from './sensor.service';
import { SensorBuilder } from './sensor.builder';
import { SensorRepository } from './sensor.repository';
import { SensorComponent } from './sensor.component';
import { SensorRoutingModule } from './sensor.routing-module';
import { SharedModule } from 'src/app/shared.module';
import { SensorAddEditComponent } from './sensor.component-add-edit';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { SensorState } from './sensor.state';
import { HeaderModule } from 'src/app/core/header/header.module';
import { PaginationModule } from '../pagination/pagination.module';
import { SearchModule } from '../search/search.module';

@NgModule({
    imports: [
        SharedModule,
        HeaderModule,
        PaginationModule,
        SearchModule,
        SensorRoutingModule,
        ReactiveFormsModule,
        NgxsModule.forFeature([SensorState])
    ],
    declarations: [
        SensorComponent,
        SensorAddEditComponent
    ],
    providers: [
        SensorService,
        SensorBuilder,
        SensorRepository
    ]
})
export class SensorModule { }
