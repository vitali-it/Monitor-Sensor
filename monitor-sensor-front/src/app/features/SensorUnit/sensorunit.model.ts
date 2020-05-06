import { SensorType } from './sensorunit.enum';

export class SensorUnitModel {

    public sensorType: SensorType;
    public unit: string;
    public rangeBegin: number;
    public rangeEnd: number;
}
