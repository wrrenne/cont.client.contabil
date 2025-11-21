import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ObrigacoesUtilsService {
    getPercentagemColor(percentage: number): string {
        if (percentage <= 25) {
            return 'text-red-500'; // Red (from-red-500)
        } else if (percentage > 25 && percentage <= 50) {
            return 'text-yellow-500'; // Yellow (from-yellow-500)
        } else if (percentage > 50 && percentage <= 75) {
            return 'text-green-500'; // Green (from-green-500)
        } else {
            return 'text-blue-500'; // Blue (from-blue-500)
        }
    }

    getPercentagemClass(percentage: number): string {
        if (percentage <= 25) {
            return 'tag-red'; // Red (from-red-500)
        } else if (percentage > 25 && percentage <= 50) {
            return 'tag-yellow'; // Yellow (from-yellow-500)
        } else if (percentage > 50 && percentage <= 75) {
            return 'tag-green'; // Green (from-green-500)
        } else {
            return 'tag-blue'; // Blue (from-blue-500)
        }
    }

    getDepartamentoColor() {
        //return 'text-' + cor + '-500';
        return 'text-gray-500';
    }
}
