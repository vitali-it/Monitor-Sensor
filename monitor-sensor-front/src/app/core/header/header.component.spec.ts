import { AuthService } from '../auth/auth.service';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared.module';
import { AuthRepository } from '../auth/auth.repository';
import { HeaderComponent } from './header.component';

describe('Header Component', () => {
    let authService: AuthService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, RouterTestingModule.withRoutes([])],
            declarations: [HeaderComponent],
            providers: [AuthService, AuthRepository],
        }).compileComponents();
    }));

    beforeEach(() => {
        authService = TestBed.inject(AuthService);
    });

    it('should create itself', () => {
        const component = TestBed.createComponent(HeaderComponent);
        const componentInstance = component.debugElement.componentInstance;
        expect(componentInstance).toBeTruthy();
    });

    it('should log out', () => {
        const component = TestBed.createComponent(HeaderComponent);
        const componentInstance = component.debugElement.componentInstance;
        spyOn(authService, 'logOut');
        componentInstance.onLogOut();
        expect(authService.logOut).toHaveBeenCalled();
    });
});
