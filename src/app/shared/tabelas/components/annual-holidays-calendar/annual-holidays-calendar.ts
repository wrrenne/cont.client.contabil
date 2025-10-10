import { Component, Input } from '@angular/core';
import { DateUtilsService } from '../../../services';
import { FeriadoData } from '../../models/feriadoData';
import { TabelasService } from '../../services/tabelas.service';
import { AnnualCalendarComponent } from '../../../controls/annual-calendar/annual-calendar';

@Component({
    selector: 'annual-holidays-calendar',
    templateUrl: 'annual-holidays-calendar.html',
    standalone: true,
    imports: [AnnualCalendarComponent]
})
export class AnnualHolidaysCalendarComponent {

    private _year: number;
    @Input() get year() {
        return this._year
    }
    set year(value: number) {
        this._year = value
        this.getData()
    }

    feriados: FeriadoData[]

    constructor(
        private tabelasService: TabelasService,
        private dateUtilsService: DateUtilsService
    ) { }

    getData() {
        const dataInicial = this.dateUtilsService.GetDateIsoString(new Date(this.year, 0, 1)) // 1/1
        const dataFinal = this.dateUtilsService.GetDateIsoString(new Date(this.year, 11, 31)) // 31/12

        this.tabelasService
            .feriadoDatasGet(dataInicial, dataFinal)
            .subscribe(x => {
                this.feriados = x.obj

                this.feriados.map(x => {
                    x.data = this.dateUtilsService.convertIsoStringToDate(x.data.toString())
                })
            })
    }

    getDate(year: number, month: number): Date {
        return new Date(year, month, 1);
    }

    getFeriadosMes(mes: number): FeriadoData[] {
        return this.feriados?.filter(x => x.data.getMonth() === mes)
    }
}
