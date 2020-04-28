import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SensorService } from './sensor.service';
import { SensorModel } from './sensor.model';
import { SensorType } from '../SensorUnit/sensorunit.enum';
import { SensorUnitModel } from '../SensorUnit/sensorunit.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-feature-sensor-add-edit',
    templateUrl: './sensor.component-add-edit.html'
})
export class SensorAddEditComponent implements OnInit, OnDestroy {

    public formGroup: FormGroup;
    private subscriptionAddition: Subscription;
    private subscriptionUpdate: Subscription;
    private subscriptionFetchById: Subscription;
    public sensorCollection: Array<SensorModel>;
    public sensor: SensorModel;
    public sensorType = SensorType;
    public isUpdate: boolean;
    private sensorId: number;

    constructor(private readonly service: SensorService,
                private readonly route: ActivatedRoute) { }

    ngOnInit(): void {
        this.sensorId = this.route.snapshot.params.id;
        this.sensor = new SensorModel();
        this.sensor.sensorUnit = new SensorUnitModel();
        this.initForm(this.sensor);
        if (this.sensorId) {
            this.isUpdate = true;
            this.subscriptionFetchById = this.service.getById(this.sensorId)
            .subscribe(retrieved => { this.sensor = retrieved; this.initForm(this.sensor); });
        }
    }

    private initForm(sensor: SensorModel) {
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
            this.subscriptionUpdate = this.service.modifyOne(this.sensor, this.sensorId).subscribe() :
            this.subscriptionAddition = this.service.addOne(this.sensor).subscribe();
    }

    ngOnDestroy(): void {
        if (this.subscriptionAddition) {
            this.subscriptionAddition.unsubscribe();
        }
        if (this.subscriptionUpdate) {
            this.subscriptionUpdate.unsubscribe();
        }
        if (this.subscriptionFetchById) {
            this.subscriptionFetchById.unsubscribe();
        }
    }
}
