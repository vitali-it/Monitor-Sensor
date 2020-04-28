import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SensorService } from './sensor.service';
import { SensorModel } from './sensor.model';
import { SensorType } from '../SensorUnit/sensorunit.enum';
import { SensorUnitModel } from '../SensorUnit/sensorunit.model';

@Component({
    selector: 'app-feature-sensor-add-edit',
    templateUrl: './sensor.component-add-edit.html'
})
export class SensorAddEditComponent implements OnInit, OnDestroy {

    public formGroup: FormGroup;
    private subscription: Subscription;
    public sensorCollection: Array<SensorModel>;
    public sensor: SensorModel;
    public sensorType = SensorType;

    constructor(private readonly service: SensorService) { }

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            name: new FormControl({
                value: null,
                disabled: false
            },
            [Validators.required]),
            model: new FormControl({
                value: null,
                disabled: false
            }),
            range: new FormControl({
                value: null,
                disabled: false
            }),
            type: new FormControl({
                value: null,
                disabled: false
            }),
            unit: new FormControl({
                value: null,
                disabled: false
            }),
            location: new FormControl({
                value: null,
                disabled: false
            }),
            description: new FormControl({
                value: null,
                disabled: false
            }),
        });
        this.sensor = new SensorModel();
        this.sensor.sensorUnit = new SensorUnitModel();
    }

    onSave() {
        this.sensor.description = this.formGroup.get('description').value;
        this.sensor.name = this.formGroup.get('name').value;
        this.sensor.location = this.formGroup.get('location').value;
        this.sensor.model = this.formGroup.get('model').value;
        this.sensor.sensorUnit.range = this.formGroup.get('range').value;
        this.sensor.sensorUnit.sensorType = this.formGroup.get('type').value;
        this.sensor.sensorUnit.unit = this.formGroup.get('unit').value;
        this.subscription = this.service.addOne(this.sensor).subscribe();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
