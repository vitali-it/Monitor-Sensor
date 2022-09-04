import { Component } from '@angular/core';
import { UserRole } from '../../../app/features/User/user.enum';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css'],
})
export class HeaderComponent {
    public isAdmin: boolean;

    constructor(private readonly authService: AuthService) {
        this.isAdmin = this.authService.getRole === UserRole.ADMIN;
    }

    onLogOut() {
        this.authService.logOut();
    }
}
