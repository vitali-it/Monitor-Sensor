import { SensorService } from './sensor.service';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { SensorModel } from './sensor.model';
import { SensorFetchAllAction, SensorEditOneAction,
     SensorFetchByIdAction, SensorCreateOneAction, SensorSetSelectedAction } from './sensor.actions';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';


@State<SensorStateModel>({
    name: 'sensorState',
    defaults: {
        thisSensor: null,
        sensors: null
    }
})
@Injectable()
export class SensorState {

    constructor(private readonly service: SensorService) { }

    @Selector()
    static selectAllData(stateModel: SensorStateModel): Array<SensorModel> {
        return stateModel.sensors;
    }

    @Selector()
    static selectDataById(stateModel: SensorStateModel): SensorModel {
        return stateModel.thisSensor;
    }

    @Action(SensorSetSelectedAction)
    setSelectedSensor({getState, setState}: StateContext<SensorStateModel>, {payload}: SensorSetSelectedAction) {
        const state = getState();
        setState({
            ...state,
            thisSensor: payload
        });
    }

    @Action(SensorFetchAllAction)
    fetchAll({getState, setState}: StateContext<SensorStateModel>) {
        return this.service.getAll()
            .pipe(tap(sensors => {
                const state = getState();
                setState({
                    ...state,
                    sensors
                });
            }
        ));
    }

    @Action(SensorFetchByIdAction)
    fetchById({getState, patchState}: StateContext<SensorStateModel>, {id}: SensorFetchByIdAction) {
        return this.service.getById(id)
            .pipe(tap(sensor => {
                const state = getState();
                patchState({
                    ...state,
                    thisSensor: sensor
                });
            }
        ));
    }

    @Action(SensorCreateOneAction)
    createOne({getState, patchState}: StateContext<SensorStateModel>, {obj}: SensorCreateOneAction) {
        return this.service.addOne(obj)
            .pipe(tap(thisSensor => {
                const state = getState();
                patchState({
                    ...state,
                    thisSensor
                });
            }
        ));
    }

    @Action(SensorEditOneAction)
    editOne({getState, patchState}: StateContext<SensorStateModel>, {obj, id}: SensorEditOneAction) {
        return this.service.modifyOne(obj, id)
            .pipe(tap(thisSensor => {
                const state = getState();
                patchState({
                    ...state,
                    thisSensor
                });
            }
        ));
    }
}

class SensorStateModel {

    thisSensor: SensorModel;
    sensors: Array<SensorModel>;
}
