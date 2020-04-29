import { SensorComponent } from './sensor.component';
import { SensorFetchAllAction,
    SensorSetSelectedAction, SensorDeleteOneAction } from './sensor.actions';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { SensorState } from './sensor.state';
import { TestBed, async } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared.module';
import { SensorBuilder } from './sensor.builder';
import { SensorService } from './sensor.service';
import { SensorRepository } from './sensor.repository';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SensorRoutingModule } from './sensor.routing-module';
import { RouterTestingModule } from '@angular/router/testing';
import { SensorModel } from './sensor.model';
import { of } from 'rxjs';
import { SensorDto } from './sensor.dto';
import { SensorUnitDto } from '../SensorUnit/sensorunit.dto';

describe('Sensor Component', () => {

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
            declarations: [SensorComponent],
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
        const component = TestBed.createComponent(SensorComponent);
        const componentInstance = component.debugElement.componentInstance;
        expect(componentInstance).toBeTruthy();
    });

    it('should dispatch all on init', () => {
        const obj = new SensorModel();
        const dto = new SensorDto();
        dto.sensorUnit = new SensorUnitDto();

        const component = TestBed.createComponent(SensorComponent);
        const componentInstance = component.debugElement.componentInstance;
        const action = new SensorFetchAllAction();

        spyOn(service, 'getAll').and.returnValue(of([dto]));
        spyOn(store, 'dispatch').withArgs(action).and.callThrough();
        componentInstance.ngOnInit();
        component.detectChanges();

        expect(store.dispatch).toHaveBeenCalledWith(action);
        expect([obj]).toBeDefined();
    });

    it('should dispatch on edit', () => {
        const obj = new SensorModel();
        const component = TestBed.createComponent(SensorComponent);
        const componentInstance = component.debugElement.componentInstance;
        const action = new SensorSetSelectedAction(obj);

        spyOn(store, 'dispatch').withArgs(action).and.callThrough();
        componentInstance.onEdit(obj);

        expect(store.dispatch).toHaveBeenCalledWith(action);
        expect(obj).toBeDefined();
    });

    it('should dispatch on delete', () => {
        const obj = new SensorModel();
        const component = TestBed.createComponent(SensorComponent);
        const componentInstance = component.debugElement.componentInstance;
        const action = new SensorDeleteOneAction(obj.id);

        spyOn(service, 'deleteById').and.returnValue(of(obj.id));
        spyOn(store, 'dispatch').withArgs(action).and.callThrough();
        componentInstance.onDelete(obj.id);

        expect(store.dispatch).toHaveBeenCalledWith(action);
    });
});
