import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthDto } from './auth.dto';
import { UserAuthDto } from '../../features/User/user-auth.dto';

@Injectable()
export class AuthRepository {
    public httpOptions: any;

    constructor(private readonly http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-type': 'application/json' }),
        };
    }

    signIn(dto: UserAuthDto): Observable<AuthDto> {
        return this.http
            .post<AuthDto>(`http://localhost:8088/auth`, JSON.stringify(dto), this.httpOptions)
            .pipe(map(response => AuthDto.convert(response)));
    }
}
