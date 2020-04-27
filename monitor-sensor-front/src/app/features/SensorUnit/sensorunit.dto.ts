import { SensorType } from './sensorunit.enum';

export class SensorUnitDto {

    public sensorType: SensorType;
    public unit: string;
    public range: number;
}
