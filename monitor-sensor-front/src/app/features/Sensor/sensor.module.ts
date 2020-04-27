import { NgModule } from '@angular/core';
import { SensorService } from './sensor.service';
import { SensorBuilder } from './sensor.builder';
import { SensorRepository } from './sensor.repository';
import { SensorComponent } from './sensor.component';
import { SensorRoutingModule } from './sensor.routing-module';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
    imports: [
        SharedModule,
        SensorRoutingModule
    ],
    declarations: [SensorComponent],
    providers: [
        SensorService,
        SensorBuilder,
        SensorRepository
    ]
})
export class SensorModule { }
