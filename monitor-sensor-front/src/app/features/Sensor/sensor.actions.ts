import { SensorModel } from './sensor.model';

const SENSOR_FETCH_ALL = '[SENSOR] Fetch all objects';
const SENSOR_FETCH_BY_ID = '[SENSOR] Fetch one object by id';
const SENSOR_CREATE_ONE = '[SENSOR] Create one object';
const SENSOR_EDIT_ONE = '[SENSOR] Edit one object';
const SENSOR_DELETE_ONE = '[SENSOR] Delete one object';
const SENSOR_SET_SELECTED = '[SENSOR] Set selected object';

export class SensorFetchAllAction {

    static readonly type = SENSOR_FETCH_ALL;

    constructor() { }
}

export class SensorFetchByIdAction {

    static readonly type = SENSOR_FETCH_BY_ID;

    constructor(public id: number) { }
}

export class SensorCreateOneAction {

    static readonly type = SENSOR_CREATE_ONE;

    constructor(public payload: SensorModel) { }
}

export class SensorEditOneAction {

    static readonly type = SENSOR_EDIT_ONE;

    constructor(public payload: SensorModel, public id: number) { }
}

export class SensorDeleteOneAction {

    static readonly type = SENSOR_DELETE_ONE;

    constructor(public id: number) { }
}

export class SensorSetSelectedAction {

    static readonly type = SENSOR_SET_SELECTED;

    constructor(public payload: SensorModel) {
    }
}
