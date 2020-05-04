import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class GlobalErrorHandler implements HttpInterceptor {

    constructor(private readonly service: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                alert('The credentials are not correct');
                this.service.logOut();
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
