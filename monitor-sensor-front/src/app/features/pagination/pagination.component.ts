import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-feature-pagination',
    templateUrl: 'pagination.component.html'
})
export class PaginationComponent {

    @Input() public totalPages: Array<number>;
    @Input() public currentPage: number;
    @Output() pageEvent = new EventEmitter<number>();
    @Output() previousEvent = new EventEmitter<number>();
    @Output() nextEvent = new EventEmitter<number>();

    constructor() { }

    onPage(templatePage: number): void {
        this.pageEvent.emit(templatePage);
    }

    onPrevious(): void {
        this.previousEvent.emit();
    }

    onNext(): void {
        this.nextEvent.emit();
    }
}
