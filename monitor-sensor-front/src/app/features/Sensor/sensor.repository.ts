import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SensorDto } from './sensor.dto';
import { map } from 'rxjs/operators';

@Injectable()
export class SensorRepository {

    constructor(private readonly httpClient: HttpClient) { }

    findAll(): Observable<Array<SensorDto>> {
        return this.httpClient
            .get<Array<SensorDto>>('http://localhost:8088/api/v1/sensors')
            .pipe(map(data => data ));
    }
}
