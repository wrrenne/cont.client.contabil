import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DateUtilsService } from '../../services';
import { HtmlUtilsService } from '../../services/htmlUtils.service';
import { FeriadoData } from '../../tabelas/models/feriadoData';

export class MonthCalendarDiaInfo {
    data: Date;
    infos: string[];
    cor: string;
}

export class TDay {
    day: number;
    currentMonth: boolean;
    date: Date;
    cor?: string;
    infos?: string[];
}

export class MonthCalendarParameters {
    currentMonth: Date;
    feriados: FeriadoData[];
    diaInfos?: MonthCalendarDiaInfo[];
}

@Component({
    selector: 'month-calendar',
    templateUrl: 'month-calendar.html',
    standalone: true,
    imports: [CommonModule, DatePipe],
    host: { class: 'ppanel rounded-xl pb-5' },
})
export class MonthCalendarComponent {
    feriados: FeriadoData[];
    diaInfos?: MonthCalendarDiaInfo[];

    get weekdayNames(): string[] {
        return this.dateUtilsService.dayNames;
    }

    year: number = 0;
    month: number = 0;
    i: number = 0;

    daysArray: TDay[];

    @Input()
    set parameters(value: MonthCalendarParameters) {
        this.year = value.currentMonth.getUTCFullYear();
        this.i = value.currentMonth.getUTCMonth();
        this.month = value.currentMonth.getUTCMonth() + 1;
        this.feriados = value.feriados;
        this.diaInfos = value.diaInfos;
        this.daysArray = this.getDaysArray(this.year, this.i);
    }

    constructor(
        private dateUtilsService: DateUtilsService,
        private htmlUtilsService: HtmlUtilsService,
    ) {}

    getDaysInMonth(year: number, month: number): number {
        return new Date(year, month + 1, 0).getDate();
    }

    private getDaysArray(year: number, month: number): TDay[] {
        const days: TDay[] = [];

        // First day of the month
        const firstDayOfMonth = new Date(year, month, 1);
        const startDay = firstDayOfMonth.getDay(); // Day of the week (0 = Sunday, 6 = Saturday)

        // Adjust start date to the previous Sunday
        const startDate = new Date(year, month, 1 - startDay);

        // Last day of the month
        const daysInMonth = this.getDaysInMonth(year, month);
        const lastDayOfMonth = new Date(year, month, daysInMonth);
        const endDay = lastDayOfMonth.getDay();

        // Adjust end date to the next Saturday
        const endDate = new Date(year, month, daysInMonth + (6 - endDay));

        // Generate days array
        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            if (this.diaInfos) {
                const dayInfo = this.getDayInfo(date);

                days.push({
                    day: date.getDate(),
                    currentMonth: date.getMonth() === month,
                    date: new Date(date), // Store full Date object
                    cor: dayInfo?.cor != undefined ? this.htmlUtilsService.getTextColor(dayInfo?.cor) : undefined,
                    infos: dayInfo?.infos,
                });
            } else {
                days.push({
                    day: date.getDate(),
                    currentMonth: date.getMonth() === month,
                    date: new Date(date), // Store full Date object
                    cor: this.isHoliday(date) ? 'tag tag-red' : this.isSunday(date) ? 'text-red-500' : '',
                    infos: ['Folga'],
                });
            }
        }

        return days;
    }

    getEmptySlots(year: number, month: number): number[] {
        return Array.from({ length: new Date(year, month, 1).getDay() }); // Creates an array of empty slots
    }

    isSunday(d: Date): boolean {
        return d.getDay() === 0;
    }

    isHoliday(d: Date): boolean {
        return this.feriados?.findIndex((x) => x.data.getDate() === d.getDate() && x.data.getMonth() === d.getMonth()) > -1;
    }

    //isSunday(year: number, month: number, day: number): boolean {
    //    return new Date(year, month, day).getDay() === 0;
    //}

    //isHoliday(year: number, month: number, day: number): boolean {
    //    return this.feriados?.findIndex(x => x.data.getDate() === day && x.data.getMonth() === month) > -1
    //}

    getMonthName(): string {
        return this.dateUtilsService.monthNamesFull[this.month - 1];
    }

    getDayInfo(date: Date): MonthCalendarDiaInfo | undefined {
        return this.diaInfos?.find((x) => this.dateUtilsService.compareDates(x.data, date));
    }

    //    getDayInfos(date: Date): string[] | undefined {
    //        return this.diaInfos?.find(x => this.dateUtilsService.compareDates(x.data, date))?.infos
    //    }
}
