import { NgModule } from '@angular/core';
import { SensorComponent } from './sensor.component';
import { Routes, RouterModule } from '@angular/router';
import { SensorAddEditComponent } from './sensor.component-add-edit';

const routes: Routes = [
    {
        path: '',
        component: SensorComponent
    },
    {
        path: 'form',
        component: SensorAddEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SensorRoutingModule { }
