import { Injectable } from '@angular/core';
import { SensorRepository } from './sensor.repository';
import { SensorBuilder } from './sensor.builder';
import { SensorModel } from './sensor.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SensorService {

    constructor(private readonly repository: SensorRepository,
                private readonly builder: SensorBuilder) { }

    getAll(): Observable<Array<SensorModel>> {
        return this.repository.findAll()
                .pipe(map(data => {
                    const result = this.builder.build(data);
                    return result;
                }));
    }

    seekBySubstrWithPage(substr: string, page: number): Observable<Array<any>> {
        return this.repository.findBySubstrAndPage(substr, page)
                .pipe(map(data => this.pageToCollection(data)));
    }

    getAllByPage(page: number): Observable<Array<any>> {
        return this.repository.findAllByPage(page)
                .pipe(map(data => this.pageToCollection(data)));
    }

    getById(id: number): Observable<SensorModel> {
        return this.repository.findById(id)
                .pipe(map(data => {
                    const result = this.builder.buildOne(data);
                    return result;
                }));
    }

    addOne(model: SensorModel): Observable<SensorModel> {
        const dto = this.builder.unBuild(model);
        return this.repository.saveOne(dto);
    }

    modifyOne(model: SensorModel, id: number): Observable<SensorModel> {
        const dto = this.builder.unBuild(model);
        return this.repository.updateOne(dto, id);
    }

    deleteById(id: number): Observable<number> {
        return this.repository.removeById(id);
    }

    private pageToCollection(data: any) {
        const firstEl = 'content';
        const secondEl = 'totalPages';
        const thirdEl = 'totalElements';
        const content = this.builder.build(data[firstEl]);
        const totalPages = data[secondEl];
        const totalElements = data[thirdEl];
        const res = new Array();
        res.push(content);
        res.push(totalPages);
        res.push(totalElements);
        return res;
    }
}
