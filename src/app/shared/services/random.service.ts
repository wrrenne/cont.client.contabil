import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RandomService {

    constructor() { }

    sortearCor(prefixo: string, codigoCor: number): string {
        const strings: string[] = ["red", "orange", "green", "indigo"];
        const indiceSorteado: number = Math.floor(Math.random() * strings.length);
        return `${prefixo}-${strings[indiceSorteado]}-${codigoCor}`;
    }
}
