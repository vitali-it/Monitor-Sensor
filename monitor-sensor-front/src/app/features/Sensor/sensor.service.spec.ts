import { TestBed } from '@angular/core/testing';
import { SensorRepository } from './sensor.repository';
import { SharedModule } from 'src/app/shared.module';
import { SensorDto } from './sensor.dto';
import { of } from 'rxjs';
import { SensorService } from './sensor.service';
import { SensorBuilder } from './sensor.builder';
import { SensorModel } from './sensor.model';

describe('Sensor Service', () => {

    let repository: SensorRepository;
    let service: SensorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule
            ],
            providers: [
                SensorRepository,
                SensorService,
                SensorBuilder
            ]
        });
        service = TestBed.inject(SensorService);
        repository = TestBed.inject(SensorRepository);
    });

    it('should get all', () => {
        const dto = new SensorDto();
        const dtoArr = new Array<SensorDto>();
        dtoArr.push(dto);
        spyOn(repository, 'findAll').and.returnValue(of(dtoArr));

        service.getAll()
            .subscribe(data => {
                expect(data).toBeDefined();
                expect(dtoArr[0].name).toBe(data[0].name);
                expect(repository.findAll).toHaveBeenCalled();
            });
    });

    it('should get an element by its id', () => {
        const dto = new SensorDto();
        spyOn(repository, 'findById').and.returnValue(of(dto));

        service.getById(dto.id)
            .subscribe(data => {
                expect(data).toBeDefined();
                expect(dto.name).toBe(data.name);
                expect(repository.findById).toHaveBeenCalled();
            });
    });

    it('should add an element', () => {
        const dto = new SensorDto();
        const dtoArr = new Array<SensorDto>();
        dtoArr.push(dto);
        const model = new SensorModel();
        spyOn(repository, 'saveOne').and.returnValue(of(dtoArr));

        service.addOne(model)
            .subscribe(data => {
                expect(data).toBeDefined();
                expect(model.name).toBe(data.name);
                expect(repository.saveOne).toHaveBeenCalled();
            });
    });

    it('should modify an element', () => {
        const dto = new SensorDto();
        const dtoArr = new Array<SensorDto>();
        dtoArr.push(dto);
        const model = new SensorModel();
        spyOn(repository, 'updateOne').and.returnValue(of(dtoArr));

        service.modifyOne(model, model.id)
            .subscribe(data => {
                expect(data).toBeDefined();
                expect(model.name).toBe(data.name);
                expect(repository.updateOne).toHaveBeenCalled();
            });
    });

    it('should delete an element', () => {
        const model = new SensorModel();
        spyOn(repository, 'removeById').and.returnValue(of(model.id));

        service.deleteById(1)
            .subscribe(data => {
                expect(data).not.toBeNaN();
                expect(data).toBe(model.id);
                expect(repository.removeById).toHaveBeenCalled();
            });
    });
});
