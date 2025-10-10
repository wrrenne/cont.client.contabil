import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateUtilsService } from '../../services';

@Component({
    selector: 'month-buttons',
    templateUrl: './month-buttons.html'
})
export class MonthButtonsComponent implements OnInit {
    @Input() givenMonth: Date = new Date(); // Default to current month if not provided
    @Output() monthClicked = new EventEmitter<Date>(); // Emit the clicked month
    months: { label: string, date: Date }[] = [];

    constructor(private dateUtilsService: DateUtilsService) { }

    ngOnInit(): void {
        this.generateMonthLabels();
    }

    generateMonthLabels(): void {
        const currentYear = this.givenMonth.getFullYear();
        const currentMonth = this.givenMonth.getMonth();

        // Generate months from -3 to +3 relative to the given month
        this.months = Array.from({ length: 7 }, (_, index) => {
            const offset = index - 3; // 3 months before to 3 months after
            const date = new Date(currentYear, currentMonth + offset, 1); // First day of the month
            //const yearLabel = date.getFullYear() !== currentYear ? ` ${date.getFullYear()}` : '';
            return { label: `${this.dateUtilsService.monthNames[date.getMonth()]}`, date };
        //    return { label: `${this.dateUtilsService.monthNames[date.getMonth()]}${yearLabel}`, date };
        });
    }

    onMonthClick(month: Date): void {
        this.monthClicked.emit(month);
    }

    isGivenMonth(date: Date): boolean {
        return (
            date.getFullYear() === this.givenMonth.getFullYear() &&
            date.getMonth() === this.givenMonth.getMonth()
        );
    }
}
