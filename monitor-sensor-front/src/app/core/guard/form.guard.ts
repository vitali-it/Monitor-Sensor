import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SensorAddEditComponent } from '../../../app/features/Sensor/sensor.component-add-edit';

@Injectable()
export class FormGuard implements CanDeactivate<SensorAddEditComponent> {
    canDeactivate(
        component: SensorAddEditComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return component.isCanceled ? component.leaveForm() : true;
    }
}
