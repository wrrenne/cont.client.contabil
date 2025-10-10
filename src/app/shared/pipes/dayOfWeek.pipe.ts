import { Pipe, PipeTransform } from '@angular/core';

// Pipe to display the day of the week of a given date
@Pipe({
    name: 'dayOfWeek',
    standalone: true
})
export class DayOfWeekPipe implements PipeTransform {
    transform(value: Date | string | number): string {
        const date = new Date(value);
        const dayNames = [
            'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'
        ];
        return isNaN(date.getTime()) ? '' : dayNames[date.getUTCDay()];
    }
}
