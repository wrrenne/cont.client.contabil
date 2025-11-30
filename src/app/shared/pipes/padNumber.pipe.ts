import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'padNumber',
})
export class PadNumberPipe implements PipeTransform {
    // {{ 5 | padNumber:3 }}

    transform(value: number | string, digits: number): string {
        if (value == null || digits == null) return '';

        const str = String(value);
        return str.padStart(digits, '0');
    }
}
