import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addMonths, startOfMonth } from 'date-fns';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { DateUtilsService } from '../../services';

@Component({
    selector: 'month-select',
    templateUrl: './month-select.html',
    imports: [FormsModule, NzSelectModule],
})
export class MonthSelectComponent implements OnInit {
    @Input() baseMonth: Date = new Date(); // Default to the current month if not provided
    @Output() monthSelected = new EventEmitter<Date>();

    months: { label: string; value: Date }[] = [];
    selectedMonth: Date | null = null;
    groupedMonths: { year: number; months: { label: string; value: Date }[] }[] = [];

    constructor(private dateUtilsService: DateUtilsService) {}

    ngOnInit(): void {
        this.generateMonths();
        this.setInitialMonth();
        this.groupMonthsByYear();
    }

    generateMonths(): void {
        const startMonth = addMonths(this.baseMonth, -12); // 12 months before the base month
        const endMonth = addMonths(this.baseMonth, 6); // 6 months after the base month
        const currentMonth = new Date(startMonth);

        this.months = [];

        while (currentMonth <= endMonth) {
            const monthStart = startOfMonth(currentMonth);
            const label = `${this.dateUtilsService.monthNamesFull[monthStart.getMonth()]}`;
            this.months.push({
                label,
                value: monthStart,
            });
            currentMonth.setMonth(currentMonth.getMonth() + 1);
        }
    }

    setInitialMonth(): void {
        const currentMonthStart = startOfMonth(this.baseMonth);

        // Ensure the match is based on both year and month
        const foundMonth = this.months.find(
            (month) => month.value.getFullYear() === currentMonthStart.getFullYear() && month.value.getMonth() === currentMonthStart.getMonth(),
        );

        this.selectedMonth = foundMonth ? foundMonth.value : null;

        //    if (this.selectedMonth) {
        //        this.monthSelected.emit(this.selectedMonth);
        //    }
    }

    groupMonthsByYear(): void {
        const grouped: { year: number; months: { label: string; value: Date }[] }[] = [];

        this.months.forEach((month) => {
            const year = month.value.getFullYear();
            const group = grouped.find((g) => g.year === year);

            if (group) {
                group.months.push(month);
            } else {
                grouped.push({ year, months: [month] });
            }
        });

        this.groupedMonths = grouped;
    }

    onMonthChange(selectedDate: Date): void {
        if (selectedDate) {
            // Emit the exact first day of the selected month
            const selectedMonthStart = startOfMonth(selectedDate);
            this.monthSelected.emit(selectedMonthStart);
        }
    }
}
