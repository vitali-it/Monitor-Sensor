import { NgModule } from '@angular/core';
import { SensorComponent } from './sensor.component';
import { Routes, RouterModule } from '@angular/router';
import { SensorAddEditComponent } from './sensor.component-add-edit';
import { RoleGuard } from 'src/app/core/guard/role.guard';

const routes: Routes = [
    {
        path: '',
        component: SensorComponent
    },
    {
        path: 'form',
        component: SensorAddEditComponent,
        canActivate: [RoleGuard]
    },
    {
        path: 'form/:id',
        component: SensorAddEditComponent,
        canActivate: [RoleGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SensorRoutingModule { }
