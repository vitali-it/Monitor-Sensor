import { Injectable } from '@angular/core';
import { SensorDto } from './sensor.dto';
import { SensorModel } from './sensor.model';

@Injectable()
export class SensorBuilder {

    build(dtoArr?: Array<SensorDto>): Array<SensorModel> {
        if (!dtoArr) {
            return null;
        }
        const myArray = new Array<SensorModel>();
        for (const dto of dtoArr) {
            const model = new SensorModel();
            model.id = dto ? dto.id : 0;
            model.description = dto ? dto.description : null;
            model.location = dto ? dto.location : null;
            model.model = dto ? dto.model : null;
            model.sensorUnit = dto ? dto.sensorUnit : null;
            model.name = dto ? dto.name : null;
            myArray.push(model);
        }
        return myArray;
    }
}
