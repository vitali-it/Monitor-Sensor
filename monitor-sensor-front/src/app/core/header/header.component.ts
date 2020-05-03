import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnDestroy {

    private subscription: Subscription;

    constructor(private readonly authService: AuthService) { }

    onLogOut() {
        this.authService.logOut();
    }
    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
