import { SearchComponent } from './search.component';
import { waitForAsync, TestBed } from '@angular/core/testing';

describe('Search Component', () => {

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SearchComponent]
      }).compileComponents();
    }));

    it('should create itself', () => {
      const component = TestBed.createComponent(SearchComponent);
      const componentInstance = component.debugElement.componentInstance;
      expect(componentInstance).toBeTruthy();
    });
});
