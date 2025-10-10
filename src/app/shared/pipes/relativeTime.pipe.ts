import { Pipe, PipeTransform } from '@angular/core';
import { StringsService } from '../services';

@Pipe({
    name: 'relativeTime',
    standalone: true
})
export class RelativeTimePipe implements PipeTransform {

    constructor(private stringsService: StringsService) { }

    transform(value: Date | string | number): string {
        if (!value) return 'Data inválida';

        const now = new Date();
        const inputDate = new Date(value);
        const diffInSeconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);

        if (diffInSeconds < 0) return 'No futuro';

        const intervals = [
            { singular: 'ano', plural: '{0} anos', seconds: 31536000 },
            { singular: 'mês', plural: '{0} meses', seconds: 2592000 },
            { singular: 'semana', plural: '{0} semanas', seconds: 604800 },
            { singular: 'dia', plural: '{0} dias', seconds: 86400 },
            { singular: 'hora', plural: '{0} horas', seconds: 3600 },
            { singular: 'minuto', plural: '{0} minutos', seconds: 60 },
            { singular: 'segundo', plural: '{0} segundos', seconds: 1 },
        ];

        for (const interval of intervals) {
            const amount = Math.floor(diffInSeconds / interval.seconds);
            if (amount >= 1) {
                return this.stringsService.getSingularPlural(amount, null, `1 ${interval.singular} atrás`, `${interval.plural} atrás`);
            }
        }

        return 'Agora';
    }

//    private getSingularPlural(n: number, messageNone: string | null, messageSingular: string, messagePlural: string | null): string {
//        if (n === 0) return messageNone ?? '';
//        if (n === 1) return messageSingular;
//        return (messagePlural ?? '').replace('{0}', n.toString());
//    }
}
