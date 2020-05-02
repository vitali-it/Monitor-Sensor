import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { AuthRepository } from './auth.repository';
import { AuthDto } from './auth.dto';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { UserAuthModel } from '../../features/User/user-auth.model';
import { UserAuthDto } from '../../features/User/user-auth.dto';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    private TOKEN = 'AUTH_TOKEN';
    private ROLE = 'USER_ROLE';

    constructor(@Inject(LOCAL_STORAGE) private readonly localStorage: StorageService,
                private readonly repository: AuthRepository,
                private readonly router: Router) { }

    logIn(model: UserAuthModel): Observable<AuthDto> {
      const dto = new UserAuthDto();
      dto.username = model.username;
      dto.password = model.password;
      return this.repository.signIn(dto);
    }

    logOut(): void {
        this.router.navigate(['auth']);
        this.clearStorage();
    }

    clearStorage(): void {
        this.localStorage.remove(this.TOKEN);
        this.localStorage.remove(this.ROLE);
    }

    setTokenAndRole(dto: AuthDto): void {
        this.localStorage.set(this.TOKEN, dto.token);
        this.localStorage.set(this.ROLE, dto.role);
    }

    get getToken(): string {
        return this.localStorage.get(this.TOKEN);
    }

    get getRole(): string {
        return this.localStorage.get(this.ROLE);
    }

    get isLoggedIn(): boolean {
        return this.localStorage.has(this.TOKEN) && this.localStorage.has(this.ROLE);
    }
}
