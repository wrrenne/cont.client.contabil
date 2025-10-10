import { Component, Input } from '@angular/core';
import { DateUtilsService } from '../../../services';
import { FeriadoData } from '../../models/feriadoData';
import { TabelasService } from '../../services/tabelas.service';
import { MonthCalendarDiaInfo } from '../../../controls/month-calendar/month-calendar';

@Component({
    selector: 'month-holidays-calendar',
    templateUrl: 'month-holidays-calendar.html',
    host: { 'class': 'pb-5' }
})
export class MonthHolidaysCalendarComponent {

    @Input() feriados: FeriadoData[]
    @Input() diaInfos?: MonthCalendarDiaInfo[]

    get weekdayNames(): string[] {
        return this.dateUtilsService.dayNames
    }

    year: number = 0
    month: number = 0
    i: number = 0

    private _currentMonth: Date

    @Input()
    get currentMonth(): Date {
        return this._currentMonth
    }
    set currentMonth(value: Date) {
        this._currentMonth = value
        this.year = value.getUTCFullYear()
        this.i = value.getUTCMonth()
        this.month = value.getUTCMonth() + 1

        this.getData()
    }

    constructor(
        private dateUtilsService: DateUtilsService,
        private tabelasService: TabelasService
    ) { }

    getData() {
        var d: Date = new Date(this.year, this.month - 1, 1)
        const dataInicial = this.dateUtilsService.GetDateIsoString(d)
        const dataFinal = this.dateUtilsService.GetDateIsoString(this.dateUtilsService.lastDateOfMonth(d))

        this.tabelasService
            .feriadoDatasGet(dataInicial, dataFinal)
            .subscribe(x => {
                this.feriados = x.obj

                this.feriados.map(x => {
                    x.data = this.dateUtilsService.convertIsoStringToDate(x.data.toString())
                })
            })
    }
}
