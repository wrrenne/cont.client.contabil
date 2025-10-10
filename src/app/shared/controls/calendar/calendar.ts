// calendar.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateUtilsService } from '../../services';

@Component({
    selector: 'calendar',
    templateUrl: './calendar.html',
    standalone: true,
    imports: [CommonModule],
    styleUrls: ['./calendar.css']
})
export class CalendarComponent implements OnInit {

    constructor(private dateUtilsService: DateUtilsService) { }

    @Output() onDayClicked = new EventEmitter<Date>()

    @Input() initialDate!: Date;
    @Input() finalDate!: Date;
    @Input() specialDays: Date[] = [
        new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1), // Yesterday
        new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),     // Today
        new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)  // Tomorrow
    ]; // Array of special days

    weeks: Date[][] = [];
    weekDayNames: string[] = this.dateUtilsService.dayNames;

    ngOnInit() {
        if (!this.initialDate || !this.finalDate) {
            throw new Error('Initial and Final dates must be provided');
        }
        this.generateCalendar();
    }

    private generateCalendar() {
        const start = new Date(this.initialDate);
        const end = new Date(this.finalDate);

        // Align start to the nearest previous Sunday
        start.setDate(start.getDate() - start.getDay());

        let current = new Date(start);
        this.weeks = [];
        let week: Date[] = [];

        while (current <= end || current.getDay() !== 0) {
            week.push(new Date(current));
            current.setDate(current.getDate() + 1);

            if (week.length === 7) {
                this.weeks.push(week);
                week = [];
            }
        }

        // Push remaining days in the last week
        if (week.length > 0) {
            this.weeks.push(week);
        }
    }

    isWithinRange(date: Date): boolean {
        return date >= this.initialDate && date <= this.finalDate;
    }

    isSpecialDay(date: Date): boolean {
        return this.specialDays.some(
            specialDate => specialDate.toDateString() === date.toDateString()
        );
    }

    isToday(date: Date): boolean {
        return date.toDateString() === (new Date()).toDateString()
    }

    dayClick(date: Date) {
        this.onDayClicked.emit(date)
    }
}
