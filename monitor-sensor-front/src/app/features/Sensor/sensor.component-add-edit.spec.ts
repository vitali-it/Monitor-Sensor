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
import { Subscription, of } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { SensorRoutingModule } from './sensor.routing-module';
import { RouterTestingModule } from '@angular/router/testing';
import { SensorCreateOneAction, SensorEditOneAction } from './sensor.actions';
import { SensorModel } from './sensor.model';
import { SensorUnitModel } from '../SensorUnit/sensorunit.model';


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

    it('should check', () => {
        const component = TestBed.createComponent(SensorAddEditComponent);
        const componentInstance = component.debugElement.componentInstance;
        fakeForm(componentInstance);
        componentInstance.isNameReserved = false;
        componentInstance.ngDoCheck();
        expect(componentInstance.isDisabled)
                .toEqual(componentInstance.formGroup.invalid && componentInstance.isNameReserved);
    });

    it('should edit', () => {
        const component = TestBed.createComponent(SensorAddEditComponent);
        const componentInstance = component.debugElement.componentInstance;
        fakeForm(componentInstance);
        componentInstance.isUpdate = true;
        componentInstance.sensor = new SensorModel();
        componentInstance.sensor.name = 'name';
        componentInstance.sensor.location = 'location';
        componentInstance.sensor.model = 'model';
        componentInstance.sensor.description = 'description';
        componentInstance.sensor.sensorUnit = new SensorUnitModel();
        componentInstance.sensor.sensorUnit.rangeBegin = 10;
        componentInstance.sensor.sensorUnit.rangeEnd = 100;
        componentInstance.sensor.sensorUnit.type = '100';
        componentInstance.sensor.sensorUnit.unit = 'unit';
        const action = new SensorEditOneAction(componentInstance.sensor, componentInstance.sensor.id);

        spyOn(service, 'modifyOne').and.returnValue(of(componentInstance.sensor));
        spyOn(store, 'dispatch').withArgs(action).and.callThrough();
        componentInstance.onSave();

        expect(store.dispatch).toHaveBeenCalledWith(action);
        expect(componentInstance.sensor).toBeDefined();
    });

    it('should add', () => {
        const component = TestBed.createComponent(SensorAddEditComponent);
        const componentInstance = component.debugElement.componentInstance;
        fakeForm(componentInstance);
        componentInstance.isUpdate = false;
        componentInstance.sensor = new SensorModel();
        componentInstance.sensor.sensorUnit = new SensorUnitModel();
        const action = new SensorCreateOneAction(componentInstance.sensor);

        spyOn(service, 'addOne').and.returnValue(of(componentInstance.sensor));
        spyOn(store, 'dispatch').withArgs(action).and.callThrough();
        componentInstance.onSave();

        expect(store.dispatch).toHaveBeenCalledWith(action);
        expect(componentInstance.sensor).toBeDefined();
    });

    it('should unsubscribe', () => {
        const component = TestBed.createComponent(SensorAddEditComponent);
        const componentInstance = component.componentInstance;
        componentInstance.subscription = new Subscription();
        componentInstance.subscriptionFetchById = new Subscription();
        spyOn(componentInstance.subscription, 'unsubscribe');
        spyOn(componentInstance.subscriptionFetchById, 'unsubscribe');
        componentInstance.ngOnDestroy();
        expect(componentInstance.subscription.unsubscribe).toHaveBeenCalled();
        expect(componentInstance.subscriptionFetchById.unsubscribe).toHaveBeenCalled();
    });
});

const fakeForm = (componentInstance: SensorAddEditComponent) => {
    componentInstance.formGroup = new FormGroup({
        name: new FormControl(),
        model: new FormControl(),
        rangeBegin: new FormControl(),
        rangeEnd: new FormControl(),
        type: new FormControl(),
        unit: new FormControl(),
        location: new FormControl(),
        description: new FormControl()
    });
};
