import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { SensorState } from './sensor.state';
import { TestBed, async } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared.module';
import { SensorBuilder } from './sensor.builder';
import { SensorService } from './sensor.service';
import { SensorRepository } from './sensor.repository';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { SensorAddEditComponent } from './sensor.component-add-edit';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { SensorRoutingModule } from './sensor.routing-module';
import { RouterTestingModule } from '@angular/router/testing';


describe('Sensor Add Edit Component', () => {

    let httpTestingController: HttpTestingController;
    let store: Store;
    let service: SensorService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                HttpClientModule,
                HttpClientTestingModule,
                SensorRoutingModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([]),
                NgxsModule.forFeature([SensorState]),
                NgxsModule.forRoot()
            ],
            declarations: [SensorAddEditComponent],
            providers: [
                SensorRepository,
                SensorService,
                SensorBuilder
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        httpTestingController = TestBed.inject(HttpTestingController);
        store = TestBed.inject(Store);
        service = TestBed.inject(SensorService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should create itself', () => {
        const component = TestBed.createComponent(SensorAddEditComponent);
        const componentInstance = component.debugElement.componentInstance;
        expect(componentInstance).toBeTruthy();
    });

    it('should unsubscribe', () => {
        const component = TestBed.createComponent(SensorAddEditComponent);
        const componentInstance = component.componentInstance;
        componentInstance.subscriptionFetchById = new Subscription();
        spyOn(componentInstance.subscriptionFetchById, 'unsubscribe');
        componentInstance.ngOnDestroy();
        expect(componentInstance.subscriptionFetchById.unsubscribe).toHaveBeenCalled();
    });
});
