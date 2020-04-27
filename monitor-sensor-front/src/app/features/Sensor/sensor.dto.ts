import { SensorUnitModel } from '../SensorUnit/sensorunit.model';

export class SensorDto {

    public id: number;
    public sensorUnit: SensorUnitModel;
    public name: string;
    public model: string;
    public description: string;
    public location: string;
    public createdDate: Date;
    public updatedDate: Date;
}
