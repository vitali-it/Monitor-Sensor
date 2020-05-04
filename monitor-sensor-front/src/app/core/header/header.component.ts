import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent {

    constructor(private readonly authService: AuthService) { }

    onLogOut() {
        this.authService.logOut();
    }
}
