import { SensorComponent } from './sensor.component';
import { SensorSetSelectedAction,
    SensorDeleteOneAction, SensorFetchAllByPageAction, SensorSearchAction } from './sensor.actions';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { SensorState } from './sensor.state';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { SharedModule } from '../../../app/shared.module';
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
import { AuthService } from '../../../app/core/auth/auth.service';
import { AuthRepository } from '../../../app/core/auth/auth.repository';
import { PaginationModule } from '../pagination/pagination.module';

describe('Sensor Component', () => {

    let httpTestingController: HttpTestingController;
    let store: Store;
    let service: SensorService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                HttpClientModule,
                HttpClientTestingModule,
                PaginationModule,
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
                SensorBuilder,
                AuthService,
                AuthRepository
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

    it('should dispatch all on ngAfterContentInit', () => {
        const { componentInstance, component, obj } = fakeObjects();
        const action = new SensorFetchAllByPageAction(componentInstance.currentPage);

        spyOn(service, 'getAllByPage').and.returnValue(of([]));
        spyOn(store, 'dispatch').withArgs(action).and.callThrough();
        componentInstance.ngAfterContentInit();
        component.detectChanges();

        expect(store.dispatch).toHaveBeenCalledWith(action);
        expect([obj]).toBeDefined();
    });

    it('should dispatch all on search', () => {
        const { componentInstance, obj } = fakeObjects();
        componentInstance.soughtData = '';
        const action = new SensorSearchAction(componentInstance.soughtData, componentInstance.currentPage);

        spyOn(service, 'seekBySubstrWithPage').and.returnValue(of([]));
        spyOn(store, 'dispatch').withArgs(action).and.callThrough();
        componentInstance.onSearch();

        expect(store.dispatch).toHaveBeenCalledWith(action);
        expect([obj]).toBeDefined();
    });

    it('should change south data', () => {
        const { componentInstance } = fakeObjects();
        const val = 'new';
        componentInstance.soughtData = '';
        componentInstance.southDataChange(val);

        expect(componentInstance.soughtData).toEqual(val);
    });

    it('should dispatch all on next page', () => {
        const { componentInstance, obj } = fakeObjects();
        const action = new SensorFetchAllByPageAction(componentInstance.currentPage + 1);

        spyOn(service, 'getAllByPage').and.returnValue(of([]));
        spyOn(store, 'dispatch').withArgs(action).and.callThrough();
        componentInstance.onNext();

        expect(store.dispatch).toHaveBeenCalledWith(action);
        expect([obj]).toBeDefined();
    });


    it('should dispatch all on previous page', () => {
        const { componentInstance, obj } = fakeObjects();
        const action = new SensorFetchAllByPageAction(componentInstance.currentPage - 1);

        spyOn(service, 'getAllByPage').and.returnValue(of([]));
        spyOn(store, 'dispatch').withArgs(action).and.callThrough();
        componentInstance.onPrevious();

        expect(store.dispatch).toHaveBeenCalledWith(action);
        expect([obj]).toBeDefined();
    });

    it('should dispatch all on page(number)', () => {
        const { componentInstance, obj } = fakeObjects();

        const page = 1;
        const action = new SensorFetchAllByPageAction(page);
        spyOn(service, 'getAllByPage').and.returnValue(of([]));
        spyOn(store, 'dispatch').withArgs(action).and.callThrough();
        componentInstance.onPage(page);

        expect(store.dispatch).toHaveBeenCalledWith(action);
        expect([obj]).toBeDefined();
        expect(componentInstance.currentPage).toEqual(page);
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

const fakeObjects = () => {
    const obj = new SensorModel();
    const dto = new SensorDto();
    dto.sensorUnit = new SensorUnitDto();
    const component = TestBed.createComponent(SensorComponent);
    const componentInstance = component.debugElement.componentInstance;
    componentInstance.currentPage = 0;
    componentInstance.totalPages = new Array<number>(2);
    return { componentInstance, component, obj };
};

