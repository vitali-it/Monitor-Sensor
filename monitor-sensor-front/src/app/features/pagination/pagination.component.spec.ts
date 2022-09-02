import { PaginationComponent } from './pagination.component';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { CoreModule } from '../../../app/core.module';

describe('Pagination Component', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CoreModule
            ],
            declarations: [PaginationComponent],
        }).compileComponents();
    }));

    it('should create itself', () => {
        const component = TestBed.createComponent(PaginationComponent);
        const componentInstance = component.debugElement.componentInstance;
        expect(componentInstance).toBeTruthy();
    });
});
