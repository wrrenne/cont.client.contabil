import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateFriendly',
})
export class DateFriendlyPipe implements PipeTransform {
    transform(value: Date | string | null | undefined): string {
        if (!value) return '';

        const date = value instanceof Date ? value : new Date(value);
        const today = new Date();

        const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();

        if (isToday) {
            return 'Today';
        }

        const isDifferentMonthAndYear = date.getMonth() !== today.getMonth() && date.getFullYear() !== today.getFullYear();

        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();

        if (isDifferentMonthAndYear) {
            return `${dd}/${mm}/${yyyy}`;
        }

        // default case: same year but different month OR same month but different day
        return `${dd}/${mm}`;
    }
}
