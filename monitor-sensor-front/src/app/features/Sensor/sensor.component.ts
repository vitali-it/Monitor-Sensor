import { Component, AfterContentInit, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SensorModel } from './sensor.model';
import { Select, Store } from '@ngxs/store';
import { SensorState } from './sensor.state';
import { SensorFetchAllAction, SensorDeleteOneAction,
    SensorSetSelectedAction } from './sensor.actions';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserRole } from '../User/user.enum';

@Component({
    selector: 'app-feature-sensor',
    templateUrl: './sensor.component.html'
})
export class SensorComponent implements OnInit, AfterContentInit {

    public isAllowed: boolean;

    constructor(private readonly store: Store, private readonly authService: AuthService) { }

    @Select(SensorState.selectAllData) sensorCollection: Observable<Array<SensorModel>>;

    ngOnInit(): void {
        this.isAllowed = this.authService.getRole === UserRole.ADMIN;
    }

    ngAfterContentInit(): void {
        this.store.dispatch(new SensorFetchAllAction());
    }

    onEdit(obj: SensorModel) {
        this.store.dispatch(new SensorSetSelectedAction(obj));
    }

    onDelete(id: number) {
        if (window.confirm('Are you really sure that you want to delete the sensor?')) {
            this.store.dispatch(new SensorDeleteOneAction(id));
        }
        return false;
    }
}
