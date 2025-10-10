import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'firstWord',
    standalone: true
})
export class FirstWordPipe implements PipeTransform {

    transform(value: string): string {
        if (!value) {
            return '';
        }

        // Divide a frase em palavras usando o espaço como separador
        const words = value.trim().split(' ');

        // Retorna a primeira palavra
        return words[0];
    }
}
