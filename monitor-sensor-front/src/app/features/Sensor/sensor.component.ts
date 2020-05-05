import { Component, AfterContentInit, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SensorModel } from './sensor.model';
import { Select, Store } from '@ngxs/store';
import { SensorState } from './sensor.state';
import { SensorDeleteOneAction, SensorSetSelectedAction,
    SensorFetchAllByPageAction,
    SensorSearchAction,
    SensorFetchAllAction} from './sensor.actions';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserRole } from '../User/user.enum';
import { SensorService } from './sensor.service';

@Component({
    selector: 'app-feature-sensor',
    templateUrl: './sensor.component.html'
})
export class SensorComponent implements OnInit, AfterContentInit, OnDestroy {

    public isAllowed: boolean;
    public pageQuantitySubscription: Subscription;
    public totalPages: Array<number>;
    public currentPage: number;
    public isSought: boolean;
    public soughtData: string;

    constructor(private readonly store: Store, private service: SensorService, private readonly authService: AuthService) { }

    @Select(SensorState.selectAllData) sensorCollection: Observable<Array<SensorModel>>;

    @Select(SensorState.selectTotalPages) pagesQuantity: Observable<number>;

    @Select(SensorState.selectTotalElements) elementsQuantity: Observable<number>;

    ngOnInit(): void {
        this.currentPage = 0;
        this.isAllowed = this.authService.getRole === UserRole.ADMIN;
        this.pageQuantitySubscription = this.pagesQuantity
                                        .subscribe(num => this.totalPages = new Array(num));
    }

    ngAfterContentInit(): void {
        this.isSought = false;
        this.store.dispatch(new SensorFetchAllByPageAction(this.currentPage));
    }

    onSearch() {
        this.isSought = true;
        this.store.dispatch(new SensorSearchAction(this.soughtData, this.currentPage));
    }

    onPage(templatePage: number) {
        this.currentPage = templatePage;
        this.whetherToShowSearchedCollection();
    }

    onPrevious() {
        this.currentPage -= 1;
        this.whetherToShowSearchedCollection();
    }

    onNext() {
        this.currentPage += 1 ;
        this.whetherToShowSearchedCollection();
    }

    private whetherToShowSearchedCollection() {
        if (this.isSought) {
            this.store.dispatch(new SensorSearchAction(this.soughtData, this.currentPage));
        }
        else {
            this.store.dispatch(new SensorFetchAllByPageAction(this.currentPage));
        }
    }

    onEdit(obj: SensorModel) {
        this.store.dispatch(new SensorSetSelectedAction(obj));
    }

    onDelete(id: number) {
        if (window.confirm('Are you really sure that you want to delete the sensor?')) {
            this.store.dispatch(new SensorDeleteOneAction(id));
        }
        return false;
    }

    ngOnDestroy(): void {
        if (this.pageQuantitySubscription) {
            this.pageQuantitySubscription.unsubscribe();
        }
    }
}
