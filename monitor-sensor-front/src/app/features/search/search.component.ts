import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-feature-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css']
})
export class SearchComponent {

    @Input() public isSought: boolean;
    @Input() public soughtData: string;
    @Output() public searchEvent = new EventEmitter<any>();
    @Output() public restartEvent = new EventEmitter<any>();
    @Output() public soughtDataEvent = new EventEmitter<string>();

    constructor() { }

    southDataChange(soughtData: string) {
        this.soughtDataEvent.emit(soughtData);
    }

    onSearch() {
        this.searchEvent.emit();
    }

    afterContentInit() {
        this.restartEvent.emit();
    }
}
