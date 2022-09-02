import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { UserRole } from '../../../app/features/User/user.enum';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly service: AuthService, private readonly router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.service.getRole !== UserRole.ADMIN) {
            this.router.navigate(['sensors']);
        }
        return true;
    }
}
