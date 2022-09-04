import { SensorUnitModel } from '../SensorUnit/sensorunit.model';

export class SensorModel {
    public id: number;
    public sensorUnit: SensorUnitModel;
    public name: string;
    public model: string;
    public description: string;
    public location: string;
}
