import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cpf',
    standalone: true
})
export class CpfPipe implements PipeTransform {

    transform(value: string | number,
        ocultarAlgunsValores: boolean = false): string {
        let valorFormat = value + '';

        valorFormat = valorFormat
            .padStart(11, '0')
            .substring(0, 11)
            .replace(/[^0-9]/, '')
            .replace(
                /(\d{3})(\d{3})(\d{3})(\d{2})/,
                '$1.$2.$3-$4'
            );

        if (ocultarAlgunsValores) {
            valorFormat =
                valorFormat.substring(0, 8) + 'XXX-XX';
                /*'XXX.' + valorFormat.substring(4, 7) + '-XX';*/
        }

        return valorFormat;
    }
}
