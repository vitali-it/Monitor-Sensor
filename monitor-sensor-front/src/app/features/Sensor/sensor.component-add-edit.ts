import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { SensorModel } from './sensor.model';
import { SensorType } from '../SensorUnit/sensorunit.enum';
import { SensorUnitModel } from '../SensorUnit/sensorunit.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { SensorState } from './sensor.state';
import { SensorFetchByIdAction, SensorEditOneAction,
    SensorCreateOneAction } from './sensor.actions';

@Component({
    selector: 'app-feature-sensor-add-edit',
    templateUrl: './sensor.component-add-edit.html'
})
export class SensorAddEditComponent implements OnInit, OnDestroy, DoCheck {

    public formGroup: FormGroup;
    public subscriptionFetchById: Subscription;
    public sensorCollection: Array<SensorModel>;
    public sensor: SensorModel;
    public sensorType = SensorType;
    private isUpdate: boolean;
    public isDisabled: boolean;
    public sensorId: number;
    public isRangeIncorrect: boolean;

    @Select(SensorState.selectDataById) selectedSensor: Observable<SensorModel>;

    constructor(private readonly route: ActivatedRoute,
                private readonly router: Router,
                private readonly store: Store) { }

    ngOnInit(): void {
        this.sensorId = this.route.snapshot.params.id;
        this.sensor = new SensorModel();
        this.sensor.sensorUnit = new SensorUnitModel();
        this.initForm(this.sensor);
        this.whetherToUpdate();
    }

    private whetherToUpdate() {
        if (this.sensorId) {
            this.isUpdate = true;
            this.subscriptionFetchById = this.selectedSensor
                .subscribe(retrieved => {
                    this.sensor = retrieved;
                    if (this.sensor) {
                        this.initForm(this.sensor);
                    }
                    else {
                        this.store.dispatch(new SensorFetchByIdAction(this.sensorId));
                    }
                });
        }
    }

    private initForm(sensor: SensorModel) {
        const keys = Object.keys(SensorType);
        this.formGroup = new FormGroup({
            name: new FormControl({
                value: sensor.name,
                disabled: false
            }, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
            model: new FormControl({
                value: sensor.model,
                disabled: false
            }, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
            rangeBegin: new FormControl({
                value: sensor.sensorUnit.rangeBegin,
                disabled: false
            }, [Validators.required, Validators.max(10000), Validators.min(-1000)]),
            rangeEnd: new FormControl({
                value: sensor.sensorUnit.rangeEnd,
                disabled: false
            }, [Validators.required, Validators.max(10000), Validators.min(-1000)]),
            type: new FormControl({
                value: sensor.sensorUnit.sensorType || keys[keys.length - 1],
                disabled: false
            }, [Validators.required]),
            unit: new FormControl({
                value: sensor.sensorUnit.unit || SensorType[keys[keys.length - 1]],
                disabled: false
            }, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
            location: new FormControl({
                value: sensor.location,
                disabled: false
            }, [Validators.maxLength(40)]),
            description: new FormControl({
                value: sensor.description,
                disabled: false
            }, Validators.maxLength(200)),
        });
    }

    ngDoCheck(): void {
        this.isDisabled = this.formGroup.invalid;
        this.isRangeIncorrect = Number.parseInt(this.formGroup.get('rangeBegin').value, 10) >
                                Number.parseInt(this.formGroup.get('rangeEnd').value, 10);
    }

    onSave() {
        this.sensor.description = this.formGroup.get('description').value;
        this.sensor.name = this.formGroup.get('name').value;
        this.sensor.location = this.formGroup.get('location').value;
        this.sensor.model = this.formGroup.get('model').value;
        this.sensor.sensorUnit.rangeBegin = Number.parseInt(this.formGroup.get('rangeBegin').value, 10);
        this.sensor.sensorUnit.rangeEnd = Number.parseInt(this.formGroup.get('rangeEnd').value, 10);
        this.sensor.sensorUnit.sensorType = this.formGroup.get('type').value;
        this.sensor.sensorUnit.unit = this.formGroup.get('unit').value;
        if (this.sensor.sensorUnit.rangeBegin > this.sensor.sensorUnit.rangeEnd) {
            return;
        }

        this.isUpdate ?
            this.store.dispatch(new SensorEditOneAction(this.sensor, this.sensorId)) :
            this.store.dispatch(new SensorCreateOneAction(this.sensor));

        this.router.navigate(['/sensors']);
    }

    ngOnDestroy(): void {
        if (this.subscriptionFetchById) {
            this.subscriptionFetchById.unsubscribe();
        }
    }
}
