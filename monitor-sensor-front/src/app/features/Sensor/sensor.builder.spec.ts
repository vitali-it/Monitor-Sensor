import { TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared.module';
import { SensorDto } from './sensor.dto';
import { SensorBuilder } from './sensor.builder';

describe('Sensor Builder', () => {

    let builder: SensorBuilder;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
            ],
            providers: [
                SensorBuilder
            ]
        });
        builder = TestBed.inject(SensorBuilder);
    });

    it('should build', () => {
        const dto = new SensorDto();
        const dtoArr = new Array<SensorDto>();
        dtoArr.push(dto);

        const model = builder.build(dtoArr);
        expect(model[0].id).toBe(dto.id);
        expect(model[0].description).toBe(dto.description);
        expect(model[0].location).toBe(dto.location);
        expect(model[0].model).toBe(dto.model);
        expect(model[0].sensorUnit).toBe(dto.sensorUnit);
        expect(model[0].name).toBe(dto.name);
    });

    it('should un-build', () => {
        const model = new SensorDto();

        const dto = builder.unBuild(model);
        expect(model.id).toBe(dto.id);
        expect(model.description).toBe(dto.description);
        expect(model.location).toBe(dto.location);
        expect(model.model).toBe(dto.model);
        expect(model.sensorUnit).toBe(dto.sensorUnit);
        expect(model.name).toBe(dto.name);
    });
});
