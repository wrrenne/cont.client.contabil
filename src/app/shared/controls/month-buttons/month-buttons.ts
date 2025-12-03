import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateUtilsService } from '../../services';
import { ButtonDefaultComponent } from '../button-default/button-default';

@Component({
    selector: 'month-buttons',
    templateUrl: './month-buttons.html',
    imports: [ButtonDefaultComponent],
})
export class MonthButtonsComponent {
    private _givenMonth: Date;
    @Input() get givenMonth() {
        return this._givenMonth;
    }
    set givenMonth(value: Date) {
        this._givenMonth = value;
        this.getData();
    }

    @Input() span = 2;
    @Input() showGivenMonth = false;

    @Output() onMonthClicked = new EventEmitter<Date>(); // Emit the clicked month
    months: { label: string; date: Date }[] = [];

    constructor(private dateUtilsService: DateUtilsService) {}

    getData(): void {
        const currentYear = this.givenMonth.getFullYear();
        const currentMonth = this.givenMonth.getMonth();

        this.months = Array.from({ length: this.span * 2 + 1 }, (_, index) => {
            const offset = index - this.span; // 3 months before to 3 months after
            const date = new Date(currentYear, currentMonth + offset, 1); // First day of the month
            return { label: `${this.dateUtilsService.monthNames[date.getMonth()]}`, date };
        });

        if (!this.showGivenMonth) this.months = this.months.filter((x) => x.date.getTime() != this.givenMonth.getTime());
    }

    onMonthClick(month: Date): void {
        this.onMonthClicked.emit(month);
    }

    isGivenMonth(date: Date): boolean {
        return date.getFullYear() === this.givenMonth.getFullYear() && date.getMonth() === this.givenMonth.getMonth();
    }
}
