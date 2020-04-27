import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SensorService } from './sensor.service';
import { SensorModel } from './sensor.model';

@Component({
    selector: 'app-feature-sensor',
    templateUrl: './sensor.component.html'
})
export class SensorComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    public sensorCollection: Array<SensorModel>;

    constructor(private readonly service: SensorService) { }

    ngOnInit(): void {
        this.subscription = this.service.getAll()
        .subscribe(allFetched => this.sensorCollection = allFetched);
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
