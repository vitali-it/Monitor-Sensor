import { TestBed } from '@angular/core/testing';
import { SensorRepository } from './sensor.repository';
import { SharedModule } from 'src/app/shared.module';
import { SensorDto } from './sensor.dto';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('Sensor Repository', () => {

    let repository: SensorRepository;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule
            ],
            providers: [
                SensorRepository
            ]
        });
        repository = TestBed.inject(SensorRepository);
        httpClient = TestBed.inject(HttpClient);
    });

    it('should find all', () => {
        const dto = new SensorDto();
        const dtoArr = new Array<SensorDto>();
        dtoArr.push(dto);
        spyOn(httpClient, 'get').and.returnValue(of(dtoArr));

        repository.findAll()
            .subscribe(data => {
                expect(data).not.toBeNull();
                expect(data).toBeDefined();
            });
    });
});
