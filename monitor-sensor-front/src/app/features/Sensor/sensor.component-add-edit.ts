import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { SensorModel } from './sensor.model';
import { SensorType } from '../SensorUnit/sensorunit.enum';
import { SensorUnitModel } from '../SensorUnit/sensorunit.model';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { SensorState } from './sensor.state';
import { SensorFetchByIdAction, SensorFetchAllAction,
    SensorEditOneAction, SensorCreateOneAction } from './sensor.actions';

@Component({
    selector: 'app-feature-sensor-add-edit',
    templateUrl: './sensor.component-add-edit.html'
})
export class SensorAddEditComponent implements OnInit, OnDestroy {

    public formGroup: FormGroup;
    public subscriptionFetchById: Subscription;
    public sensorCollection: Array<SensorModel>;
    public sensor: SensorModel;
    public sensorType = SensorType;
    public isUpdate: boolean;
    private sensorId: number;

    @Select(SensorState.selectDataById) selectedSensor: Observable<SensorModel>;

    constructor(private readonly route: ActivatedRoute,
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

    public initForm(sensor: SensorModel) {
        const keys = Object.keys(SensorType);
        this.formGroup = new FormGroup({
            name: new FormControl({
                value: sensor.name,
                disabled: false
            }, [Validators.required]),
            model: new FormControl({
                value: sensor.model,
                disabled: false
            }),
            range: new FormControl({
                value: sensor.sensorUnit.range,
                disabled: false
            }),
            type: new FormControl({
                value: sensor.sensorUnit.sensorType || keys[keys.length - 1],
                disabled: false
            }),
            unit: new FormControl({
                value: sensor.sensorUnit.unit || SensorType[keys[keys.length - 1]],
                disabled: false
            }),
            location: new FormControl({
                value: sensor.location,
                disabled: false
            }),
            description: new FormControl({
                value: sensor.description,
                disabled: false
            }),
        });
    }

    onSave() {
        this.sensor.description = this.formGroup.get('description').value;
        this.sensor.name = this.formGroup.get('name').value;
        this.sensor.location = this.formGroup.get('location').value;
        this.sensor.model = this.formGroup.get('model').value;
        this.sensor.sensorUnit.range = this.formGroup.get('range').value;
        this.sensor.sensorUnit.sensorType = this.formGroup.get('type').value;
        this.sensor.sensorUnit.unit = this.formGroup.get('unit').value;
        this.isUpdate ?
            this.store.dispatch(new SensorEditOneAction(this.sensor, this.sensorId)) :
            this.store.dispatch(new SensorCreateOneAction(this.sensor));
        this.store.dispatch(SensorFetchAllAction);
    }

    ngOnDestroy(): void {
        if (this.subscriptionFetchById) {
            this.subscriptionFetchById.unsubscribe();
        }
    }
}
