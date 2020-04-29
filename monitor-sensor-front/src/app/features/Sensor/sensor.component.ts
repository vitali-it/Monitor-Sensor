import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SensorModel } from './sensor.model';
import { Select, Store } from '@ngxs/store';
import { SensorState } from './sensor.state';
import { SensorFetchAllAction, SensorSetSelectedAction } from './sensor.actions';

@Component({
    selector: 'app-feature-sensor',
    templateUrl: './sensor.component.html'
})
export class SensorComponent implements OnInit {

    constructor(private readonly store: Store) { }

    @Select(SensorState.selectAllData) sensorCollection: Observable<Array<SensorModel>>;

    ngOnInit(): void {
        this.store.dispatch(new SensorFetchAllAction());
    }

    onEdit(obj: SensorModel) {
        this.store.dispatch(new SensorSetSelectedAction(obj));
    }
}
