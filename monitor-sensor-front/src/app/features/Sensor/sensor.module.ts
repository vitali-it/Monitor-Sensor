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
import { ValidationPipe } from './sensor.pipe';

@NgModule({
    imports: [
        SharedModule,
        SensorRoutingModule,
        ReactiveFormsModule,
        NgxsModule.forFeature([SensorState])
    ],
    declarations: [
        SensorComponent,
        ValidationPipe,
        SensorAddEditComponent
    ],
    providers: [
        SensorService,
        SensorBuilder,
        SensorRepository
    ]
})
export class SensorModule { }
