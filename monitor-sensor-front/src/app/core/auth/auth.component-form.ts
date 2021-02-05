import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthModel } from '../../../app/features/User/user-auth.model';

@Component({
    selector: 'app-auth-form',
    styleUrls: ['auth.component-form.css'],
    templateUrl: 'auth.component-form.html'
})
export class AuthFormComponent implements OnInit, OnDestroy, DoCheck {

    public subscription: Subscription;
    public form: FormGroup;
    public isDisabled: boolean;
    public model: UserAuthModel;

    constructor(private readonly service: AuthService, private readonly router: Router) { }

    ngOnInit(): void {
        this.isDisabled = true;
        this.model = new UserAuthModel();
        this.initForm(this.model);
    }

    ngDoCheck(): void {
        this.isDisabled = this.form.invalid;
    }

    onSubmit() {
        if (!this.form) {
            this.ngDoCheck();
        }
        this.model.password = this.form.get('password').value;
        this.model.username = this.form.get('username').value;

        this.subscription = this.service.logIn(this.model)
                            .subscribe(data => {
                                this.service.setTokenAndRole(data);
                                this.router.navigate(['/sensors']);
                            });
    }

    ngOnDestroy(): void {
        this.form.reset();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private initForm(model: UserAuthModel) {
        this.form = new FormGroup({
            username: new FormControl({
                value: model.username,
                disabled: false
            }, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
            password: new FormControl({
                value: model.password,
                disabled: false
            }, [Validators.required, Validators.minLength(4)]),
        });
    }
}
