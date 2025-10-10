import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pis',
    standalone: true
})
export class FormatPisPipe implements PipeTransform {

    transform(value: string): any {
        if (!value) return '';

        // Remove caracteres não numéricos
        const digits = value.replace(/\D/g, '');

        // Verifica se tem 11 dígitos
        if (digits.length !== 11) return value;

        // Formata no padrão XXX.XXXXX.XX-X
        return `${digits.slice(0, 3)}.${digits.slice(3, 8)}.${digits.slice(8, 10)}-${digits.slice(10)}`;
      }
}
