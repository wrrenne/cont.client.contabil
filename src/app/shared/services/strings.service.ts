import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StringsService {
    constructor() {}

    getSingularPlural(n: number, messageNone: string | null, messageSingular: string, messagePlural: string | null): string {
        if (n == 0) return messageNone ?? '';
        else if (n == 1) return messageSingular;
        else return (messagePlural ?? '').replace('{0}', n.toString());
    }

    getCapital(s: string): string {
        return s.charAt(0).toLocaleUpperCase() + s.slice(1);
    }
    //convertDDMMYYYYtoDate(s: string) {
    //  let dateArray = s.split("/")
    //  return new Date(dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0])
    //}

    //convertDateToDDMMYYYY(d: Date) {
    //  return d.toISOString().substring(0, 10);
    //}

    notNull(s: string, c: string = '-') {
        return s == '' || s == null ? c : s;
    }

    /**
     * format bytes
     * @param bytes (File size in bytes)
     * @param decimals (Decimals point)
     */
    formatBytes(bytes: any, decimals: any) {
        if (bytes === 0) {
            return '0 bytes';
        }
        const k = 1024;
        const dm = decimals <= 0 ? 0 : decimals || 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        //const sizes = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    stringAddLine(s: string, newLine: string) {
        return `${s}<br>${newLine}`;
    }

    firstWord(value: string): string {
        if (!value) {
            return '';
        }

        // Divide a frase em palavras usando o espaço como separador
        const words = value.trim().split(' ');

        // Retorna a primeira palavra
        return words[0];
    }

    extractFilenameParts(filePath: string): { name: string; extension: string } {
        const parts = filePath.split('/').pop() || ''; // Get the last part in case of a full path
        const lastDotIndex = parts.lastIndexOf('.');

        if (lastDotIndex === -1 || lastDotIndex === 0) {
            return { name: parts, extension: '' }; // No extension found
        }

        return {
            name: parts.substring(0, lastDotIndex),
            extension: parts.substring(lastDotIndex + 1),
        };
    }

    getInitials(name: string, capital = false): string {
        if (!name) return '';

        const ignoreWords = ['de', 'da', 'do', 'das', 'dos', 'e', 'a', 'o', 'as', 'os'];

        const words = name
            .trim()
            .split(/\s+/)
            .filter((word) => !ignoreWords.includes(word.toLowerCase()));

        if (words.length === 0) return '';

        const firstInitial = words[0].charAt(0).toUpperCase();
        const secondInitial = words.length > 1 ? words[1].charAt(0).toUpperCase() : '';

        return (capital ? firstInitial.toUpperCase() : firstInitial) + (capital ? secondInitial.toUpperCase() : secondInitial);
    }

    getValueWithSignal(s: string | undefined): string | undefined {
        if (s == undefined || s == '' || s[0] == '+') return s;

        if (s[0] != '-') return '+' + s;
        else return s;
    }

    maskCPF(value: string): string {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
            .slice(0, 14);
    }

    maskCNPJ(value: string): string {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
            .slice(0, 18);
    }

    maskCEP(value: string): string {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 9);
    }

    maskTelefone(value: string): string {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 15);
    }
}
