import { TestBed } from '@angular/core/testing';
import { SensorRepository } from './sensor.repository';
import { SharedModule } from '../../../app/shared.module';
import { SensorDto } from './sensor.dto';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('Sensor Repository', () => {
    let repository: SensorRepository;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule],
            providers: [SensorRepository],
        });
        repository = TestBed.inject(SensorRepository);
        httpClient = TestBed.inject(HttpClient);
    });

    it('should find all', () => {
        const dto = new SensorDto();
        const dtoArr = new Array<SensorDto>();
        dtoArr.push(dto);
        spyOn(httpClient, 'get').and.returnValue(of(dtoArr));

        repository.findAll().subscribe(data => {
            expect(data).not.toBeNull();
            expect(data).toBeDefined();
        });
    });

    it('should find an element by its id', () => {
        const dto = new SensorDto();
        spyOn(httpClient, 'get').and.returnValue(of(dto));

        repository.findById(dto.id).subscribe(data => {
            expect(data).not.toBeNull();
            expect(data).toBeDefined();
        });
    });

    it('should save an element', () => {
        const dto = new SensorDto();
        const dtoArr = new Array<SensorDto>();
        dtoArr.push(dto);
        spyOn(httpClient, 'post').and.returnValue(of(dto));

        repository.saveOne(dto).subscribe(data => {
            expect(data).not.toBeNull();
            expect(data).toBeDefined();
        });
    });

    it('should update an element', () => {
        const dto = new SensorDto();
        const dtoArr = new Array<SensorDto>();
        dtoArr.push(dto);
        spyOn(httpClient, 'put').and.returnValue(of(dto));

        repository.updateOne(dto, dto.id).subscribe(data => {
            expect(data).not.toBeNull();
            expect(data).toBeDefined();
        });
    });

    it('should remove an element', () => {
        const dto = new SensorDto();
        spyOn(httpClient, 'delete').and.returnValue(of(dto.id));
        repository.removeById(dto.id).subscribe(data => {
            expect(data).not.toBeNaN();
            expect(httpClient.delete).toHaveBeenCalled();
        });
    });
});
