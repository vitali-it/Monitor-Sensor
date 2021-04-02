import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SensorDto } from './sensor.dto';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

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
            .get<Array<SensorDto>>(`${environment.baseUrl}sensors`)
            .pipe(tap(data => data));
    }

    findAllByPage(page: number): Observable<any> {
        return this.httpClient
            .get<any>(`${environment.baseUrl}sensors/page?page=${page}`)
            .pipe(tap(data => data));
    }

    findBySubstrAndPage(substr: string, page: number): Observable<any> {
        const encoded = encodeURIComponent(substr);
        return this.httpClient
            .get<any>(`${environment.baseUrl}sensors/search?page=${page}&substr=${encoded}`)
            .pipe(tap(data => data));
    }

    findById(id: number): Observable<SensorDto> {
        return this.httpClient
            .get<SensorDto>(`${environment.baseUrl}sensors/${id}`)
            .pipe(tap(data => data));
    }

    saveOne(obj: SensorDto): Observable<any> {
        return this.httpClient
            .post<SensorDto>(`${environment.baseUrl}sensors`, obj, this.httpOptions)
            .pipe(tap(data => data));
    }

    updateOne(obj: SensorDto, id: number): Observable<any> {
        return this.httpClient
            .put<SensorDto>(`${environment.baseUrl}sensors/${id}`, obj, this.httpOptions)
            .pipe(tap(data => data));
    }

    removeById(id: number): Observable<number> {
        return this.httpClient
            .delete<number>(`${environment.baseUrl}sensors/${id}`)
            .pipe(tap(data => data));
    }
}
