import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate',
    standalone: true
})
export class CustomDatePipe implements PipeTransform {
    transform(value: Date | string | number): string {
        if (!value) return '';

        let date: Date;

        if (typeof value === 'string') {
            date = new Date(`${value}Z`); // Force UTC interpretation
        } else {
            date = new Date(value);
        }

        if (isNaN(date.getTime())) return '';

        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');

        return `${day}/${month}`;
    }
}
