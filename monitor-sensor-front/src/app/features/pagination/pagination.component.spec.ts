import { PaginationComponent } from './pagination.component';
import { async, TestBed } from '@angular/core/testing';

describe('Pagination Component', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [PaginationComponent]
      }).compileComponents();
    }));

    it('should create the PaginationComponent', () => {
      const component = TestBed.createComponent(PaginationComponent);
      const componentInstance = component.debugElement.componentInstance;
      expect(componentInstance).toBeTruthy();
    });
});
