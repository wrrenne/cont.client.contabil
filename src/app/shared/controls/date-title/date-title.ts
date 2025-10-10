import { Component, Input } from '@angular/core';
import { DateUtilsService } from '../../services';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'date-title',
    templateUrl: './date-title.html',
    standalone: true,
    imports: [DatePipe]
})
export class DateTitleComponent {

    @Input() data: Date;

    constructor(private dateUtilsService: DateUtilsService) {

    }

    getDiaSemana() {
        return this.dateUtilsService.getWeekDateNameAbbreviated(this.data)
    }

    getMes() {
        return this.dateUtilsService.getMonthNameAbbreviated(this.data)
    }
}
