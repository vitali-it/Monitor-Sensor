import { NgModule } from '@angular/core';
import { SensorService } from './sensor.service';
import { SensorBuilder } from './sensor.builder';
import { SensorRepository } from './sensor.repository';
import { SensorComponent } from './sensor.component';
import { SensorRoutingModule } from './sensor.routing-module';
import { SharedModule } from 'src/app/shared.module';
import { SensorAddEditComponent } from './sensor.component-add-edit';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        SharedModule,
        SensorRoutingModule,
        ReactiveFormsModule
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
