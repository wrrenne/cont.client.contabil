import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'monthYear',
    standalone: true,
})
export class MonthYearPipe implements PipeTransform {
    transform(value: Date | string, abbreviated = false): string {
        const date = new Date(value);
        const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        const monthAbbreviatedNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        return isNaN(date.getTime()) ? '' : `${abbreviated ? monthAbbreviatedNames[date.getUTCMonth()] : monthNames[date.getUTCMonth()]}/${date.getFullYear()}`;
    }
}
