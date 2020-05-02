import { CanActivate, RouterStateSnapshot,
    ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private service: AuthService, private location: Location) {  }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
                boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
                    if (!this.service.isLoggedIn) {
                        return true;
                    }
                    this.location.back();
                    return false;
    }
}
