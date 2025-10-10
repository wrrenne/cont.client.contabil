import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDateTime',
    standalone: true
})
export class CustomDateTimePipe implements PipeTransform {
    monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    monthNamesFull = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    transform(value: Date | string | number, showAbbreviatedMonth: boolean = false, showMonth: boolean = false): string {
        if (!value) return '';

        let date: Date;

        if (typeof value === 'string') {
            date = new Date(`${value}Z`); // Force UTC interpretation
        } else {
            date = new Date(value);
        }

        if (isNaN(date.getTime())) return '';

        const day = date.getUTCDate().toString().padStart(2, '0');

        const month = showAbbreviatedMonth ? this.getMonthNameAbbreviated(date) : showMonth ? this.getMonthName(date) : (date.getUTCMonth() + 1).toString().padStart(2, '0');

        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');

        return `${day}/${month} ${hours}h${minutes}`;
    }

    getMonthName(d: Date): string {
        return this.monthNamesFull[d.getUTCMonth()];
    }

    getMonthNameAbbreviated(d: Date): string {
        return this.monthNames[d.getUTCMonth()];
    }
}
