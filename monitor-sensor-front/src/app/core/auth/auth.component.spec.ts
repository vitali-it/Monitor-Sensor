import { AuthService } from './auth.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthRoutingModule } from './auth.routing-module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared.module';
import { AuthFormComponent } from './auth.component-form';
import { AuthRepository } from './auth.repository';
import { Subscription, of } from 'rxjs';
import { UserAuthModel } from 'src/app/features/User/user-auth.model';
import { AuthDto } from './auth.dto';

describe('Auth Form Component', () => {

    let httpTestingController: HttpTestingController;
    let service: AuthService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                HttpClientModule,
                HttpClientTestingModule,
                AuthRoutingModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([]),
            ],
            declarations: [AuthFormComponent],
            providers: [
                AuthService,
                AuthRepository
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(AuthService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should create itself', () => {
        const component = TestBed.createComponent(AuthFormComponent);
        const componentInstance = component.debugElement.componentInstance;
        expect(componentInstance).toBeTruthy();
    });

    it('should Log in', () => {
        const dto = new AuthDto();
        const component = TestBed.createComponent(AuthFormComponent);
        const componentInstance = component.debugElement.componentInstance;
        componentInstance.model = new UserAuthModel();
        fakeForm(componentInstance);

        spyOn(service, 'logIn').and.returnValue(of(dto));
        componentInstance.onSubmit();

        expect(service.logIn).toHaveBeenCalled();
    });

    it('should check if button is supposed to be disabled', () => {
        const component = TestBed.createComponent(AuthFormComponent);
        const componentInstance = component.debugElement.componentInstance;
        fakeForm(componentInstance);
        componentInstance.isDisabled = componentInstance.form.invalid;

        componentInstance.ngDoCheck();
        expect(componentInstance.isDisabled).toBeFalse();
    });

    it('should unsubscribe', () => {
        const component = TestBed.createComponent(AuthFormComponent);
        const componentInstance = component.componentInstance;
        componentInstance.subscription = new Subscription();
        fakeForm(componentInstance);
        spyOn(componentInstance.subscription, 'unsubscribe');
        componentInstance.ngOnDestroy();
        expect(componentInstance.subscription.unsubscribe).toHaveBeenCalled();
    });
});

function fakeForm(componentInstance: AuthFormComponent) {
        componentInstance.form = new FormGroup({
            username: new FormControl(),
            password: new FormControl()
        });
}
