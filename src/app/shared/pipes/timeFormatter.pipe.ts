import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeFormatter',
    standalone: true,
})
export class TimeFormatterPipe implements PipeTransform {
    transform(value: number, separator = ':'): string {
        if (isNaN(value) || value < 0) {
            return '';
        }

        const hours = Math.floor(value / 60);
        const minutes = value % 60;

        const hourDisplay = hours > 0 ? `${hours}` : '0';
        //const minuteDisplay = minutes > 0 ? `${minutes}` : '00';
        const minuteDisplay = `${minutes < 10 ? '0' : ''}${minutes}`;

        return `${hourDisplay}${separator}${minuteDisplay}`;
    }
}
