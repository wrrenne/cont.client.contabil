import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dashIfEmpty',
    standalone: true
})
export class DashIfEmptyPipe implements PipeTransform {
    transform(value: any): string | number {
        return value === undefined || value === null || value === 0 || value === '0:00' ? '-' : value;
    }
}
