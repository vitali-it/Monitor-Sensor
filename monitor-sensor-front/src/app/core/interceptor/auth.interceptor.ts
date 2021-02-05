import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest,
    HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private readonly service: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isApiUrl = req.url.startsWith(environment.baseUrl);
        if (this.service.isLoggedIn && isApiUrl) {
            const token = this.service.getToken;
            return next.handle(req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            }));
        }
        return next.handle(req);
    }
}
