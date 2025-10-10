import { Component, Input } from '@angular/core';

@Component({
    selector: 'rating',
    templateUrl: './rating.html'
})
export class RatingComponent {

    @Input() nota: number

    constructor() {
    }

    getNotaClass(notaIndex: number): string {
        return this.nota >= notaIndex ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-600'
    }
}
