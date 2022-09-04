import { NgModule } from '@angular/core';
import { SensorComponent } from './sensor.component';
import { Routes, RouterModule } from '@angular/router';
import { SensorAddEditComponent } from './sensor.component-add-edit';
import { RoleGuard } from '../../../app/core/guard/role.guard';
import { FormGuard } from '../../../app/core/guard/form.guard';

const routes: Routes = [
    {
        path: '',
        component: SensorComponent,
    },
    {
        path: 'form',
        component: SensorAddEditComponent,
        canActivate: [RoleGuard],
        canDeactivate: [FormGuard],
    },
    {
        path: 'form/:id',
        component: SensorAddEditComponent,
        canActivate: [RoleGuard],
        canDeactivate: [FormGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SensorRoutingModule {}
