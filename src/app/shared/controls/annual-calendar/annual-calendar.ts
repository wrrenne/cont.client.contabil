import { Component, Input } from '@angular/core';
import { FeriadoData } from '../../tabelas/models/feriadoData';
import { MonthCalendarComponent } from '../month-calendar/month-calendar';


@Component({
    selector: 'annual-calendar',
    templateUrl: 'annual-calendar.html',
    standalone: true,
    imports: [MonthCalendarComponent]
})
export class AnnualCalendarComponent {

    @Input() feriados: FeriadoData[]
    @Input() year: number

    getDate(year: number, month: number): Date {
        return new Date(year, month, 1);
    }

    getFeriadosMes(mes: number): FeriadoData[] {
        return this.feriados?.filter(x => x.data.getMonth() === mes)
    }
}
