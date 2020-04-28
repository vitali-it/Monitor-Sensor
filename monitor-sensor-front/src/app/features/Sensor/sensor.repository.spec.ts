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
                expect(httpClient.get).toHaveBeenCalled();
            });
    });

    it('should find an element by its id', () => {
        const dto = new SensorDto();
        spyOn(httpClient, 'get').and.returnValue(of(dto));

        repository.findById(1)
            .subscribe(data => {
                expect(data).not.toBeNull();
                expect(data).toBeDefined();
                expect(httpClient.get).toHaveBeenCalled();
            });
    });

    it('should save an element', () => {
        const dto = new SensorDto();
        const dtoArr = new Array<SensorDto>();
        dtoArr.push(dto);
        spyOn(httpClient, 'post').and.returnValue(of(dto));

        repository.saveOne(dto)
            .subscribe(data => {
                expect(data).not.toBeNull();
                expect(data).toBeDefined();
                expect(httpClient.post).toHaveBeenCalled();
            });
    });

    it('should update an element', () => {
        const dto = new SensorDto();
        const dtoArr = new Array<SensorDto>();
        dtoArr.push(dto);
        spyOn(httpClient, 'put').and.returnValue(of(dto));

        repository.updateOne(dto, 1)
            .subscribe(data => {
                expect(data).not.toBeNull();
                expect(data).toBeDefined();
                expect(httpClient.post).toHaveBeenCalled();
            });
    });
});
