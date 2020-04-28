import { Injectable } from '@angular/core';
import { SensorRepository } from './sensor.repository';
import { SensorBuilder } from './sensor.builder';
import { SensorModel } from './sensor.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SensorService {

    constructor(private readonly repository: SensorRepository,
                private readonly builder: SensorBuilder) { }

    getAll(): Observable<Array<SensorModel>> {
        return this.repository.findAll()
                .pipe(map(data => {
                    const result = this.builder.build(data);
                    return result;
                }));
    }

    addOne(model: SensorModel): Observable<SensorModel> {
        const dto = this.builder.unBuild(model);
        return this.repository.saveOne(dto);
    }
}
