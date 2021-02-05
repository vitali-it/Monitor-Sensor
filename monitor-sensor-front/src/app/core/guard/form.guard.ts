import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SensorAddEditComponent } from 'src/app/features/Sensor/sensor.component-add-edit';

@Injectable()
export class FormGuard implements CanDeactivate<SensorAddEditComponent> {

    canDeactivate(component: SensorAddEditComponent, _currentRoute: ActivatedRouteSnapshot,
        _currentState: RouterStateSnapshot, _nextState?: RouterStateSnapshot):
        boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
            return component.leaveForm ? component.leaveForm() : true;
    }
}
