import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SensorDto } from './sensor.dto';
import { map } from 'rxjs/operators';

@Injectable()
export class SensorRepository {

    private httpOptions: any;

    constructor(private readonly httpClient: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-type': 'application/json' })
        };
    }

    findAll(): Observable<Array<SensorDto>> {
        return this.httpClient
            .get<Array<SensorDto>>('http://localhost:8088/api/v1/sensors')
            .pipe(map(data => data));
    }

    saveOne(obj: SensorDto): Observable<any> {
        return this.httpClient
            .post<SensorDto>('http://localhost:8088/api/v1/sensors', obj, this.httpOptions)
            .pipe(map(data => data));
    }
}
