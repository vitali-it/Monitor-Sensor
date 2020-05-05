import { SensorService } from './sensor.service';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { SensorModel } from './sensor.model';
import { SensorFetchAllAction, SensorEditOneAction, SensorFetchByIdAction,
    SensorCreateOneAction, SensorSetSelectedAction, SensorDeleteOneAction, SensorFetchAllByPageAction, SensorSearchAction } from './sensor.actions';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';


@State<SensorStateModel>({
    name: 'sensorState',
    defaults: {
        thisSensor: null,
        sensors: null,
        totalPages: 0,
        totalElements: 0
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
    static selectTotalPages(stateModel: SensorStateModel): number {
        return stateModel.totalPages;
    }

    @Selector()
    static selectTotalElements(stateModel: SensorStateModel): number {
        return stateModel.totalElements;
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

    @Action(SensorSearchAction)
    searchForSensors({getState, setState}: StateContext<SensorStateModel>, {substr, page}: SensorSearchAction) {
        return this.service.seekBySubstrWithPage(substr, page)
            .pipe(tap(data => {
                this.setStateWithPagination(getState, data, setState);
            }
        ));
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

    @Action(SensorFetchAllByPageAction)
    fetchAllByPage({getState, setState}: StateContext<SensorStateModel>, {page}: SensorFetchAllByPageAction) {
        return this.service.getAllByPage(page)
            .pipe(tap(data => {
                this.setStateWithPagination(getState, data, setState);
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
    createOne({getState, patchState}: StateContext<SensorStateModel>, {payload}: SensorCreateOneAction) {
        return this.service.addOne(payload)
            .pipe(tap(result => {
                const state = getState();
                patchState({
                    sensors: [...state.sensors, result]
                });
            }
        ));
    }

    @Action(SensorEditOneAction)
    editOne({getState, setState}: StateContext<SensorStateModel>, {payload, id}: SensorEditOneAction) {
        return this.service.modifyOne(payload, id)
            .pipe(tap(result => {
                const state = getState();
                const shallowList = [...state.sensors];
                const idx = shallowList.findIndex(item => item.id === id);
                shallowList[idx] = result;
                setState({
                    ...state,
                    sensors: shallowList
                });
            }
        ));
    }

    @Action(SensorDeleteOneAction)
    deleteOne({getState, setState}: StateContext<SensorStateModel>, {id}: SensorDeleteOneAction) {
        return this.service.deleteById(id)
            .pipe(tap(() => {
                const state = getState();
                const resultList = state.sensors.filter(el => el.id !== id);
                setState({
                    ...state,
                    sensors: resultList
                });
            }
        ));
    }

    private setStateWithPagination(getState: () => SensorStateModel, data: any[], setState) {
        const state = getState();
        const content = data[0];
        const totalPages = data[1];
        const totalElements = data[2];
        setState({
            ...state,
            sensors: content,
            totalPages,
            totalElements
        });
    }
}

class SensorStateModel {

    thisSensor: SensorModel;
    sensors: Array<SensorModel>;
    totalPages: number;
    totalElements: number;
}
