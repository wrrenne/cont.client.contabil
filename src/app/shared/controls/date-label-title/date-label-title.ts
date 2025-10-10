import { Component, Input } from '@angular/core';

@Component({
    selector: 'date-label-title',
    templateUrl: './date-label-title.html'
})
export class DateLabelTitleComponent {

    @Input() date: Date | string
}
