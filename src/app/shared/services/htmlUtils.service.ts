import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SistemaTipo } from '../models';

@Injectable({
    providedIn: 'root',
})
export class HtmlUtilsService {
    readonly colors = ['red', 'green', 'blue', 'purple', 'amber', 'cyan', 'fuchsia', 'pink'];

    getRandomColor(): string {
        const index = Math.floor(Math.random() * this.colors.length);
        return this.colors[index];
    }

    getLogoUrl(): string {
        switch (environment.sistema) {
            case SistemaTipo.Ponto:
                return 'deskspace-ponto.png';
            case SistemaTipo.Contabil:
                return 'deskspace-contabil.png';
            case SistemaTipo.Financeiro:
                return 'deskspace-financeiro.png';
            case SistemaTipo.Holerite:
                return 'deskspace-holerite.png';
            case SistemaTipo.Funcionario:
                return 'deskspace.png';
            case SistemaTipo.Revenda:
                return 'deskspace.png';
            default:
                return '';
        }
    }

    // tailwind não reconhece concatenações tipo 'text-' + cor + '-500'
    getBorderColor(cor?: string): string {
        if (!cor) cor = this.getRandomColor();

        switch (cor) {
            case 'red':
                return 'border-l-red-600 dark:border-l-red-900';
            case 'green':
                return 'border-l-green-600 dark:border-l-green-900';
            case 'blue':
                return 'border-l-blue-600 dark:border-l-blue-900';
            case 'purple':
                return 'border-l-purple-600 dark:border-l-purple-900';
            case 'amber':
                return 'border-l-amber-600 dark:border-l-amber-900';
            case 'cyan':
                return 'border-l-cyan-600 dark:border-l-cyan-900';
            case 'fuchsia':
                return 'border-l-fuchsia-600 dark:border-l-fuchsia-900';
            case 'pink':
                return 'border-l-pink-600 dark:border-l-pink-900';
            case 'gray':
                return 'border-l-gray-400 dark:border-l-gray-400';
            default:
                return 'text-black dark:text-white';
        }
    }

    getTextColor(cor: string): string {
        // tailwind não reconhece concatenações tipo 'text-' + cor + '-500'
        switch (cor) {
            case 'red':
                return 'text-red-500';
            case 'green':
                return 'text-green-500';
            case 'blue':
                return 'text-blue-500';
            case 'purple':
                return 'text-purple-500';
            case 'amber':
                return 'text-amber-500';
            case 'cyan':
                return 'text-cyan-500';
            case 'fuchsia':
                return 'text-fuchsia-500';
            case 'pink':
                return 'text-pink-500';
            default:
                return 'text-black';
        }
    }

    getIconColor(cor: string): string {
        // tailwind não reconhece concatenações tipo 'text-' + cor + '-500'
        switch (cor) {
            case 'red':
                return 'text-red-700 dark:text-red-300';
            case 'green':
                return 'text-green-700 dark:text-green-300';
            case 'blue':
                return 'text-blue-700 dark:text-blue-300';
            case 'purple':
                return 'text-purple-700 dark:text-purple-300';
            case 'amber':
                return 'text-amber-700 dark:text-amber-300';
            case 'cyan':
                return 'text-cyan-700 dark:text-cyan-300';
            case 'fuchsia':
                return 'text-fuchsia-700 dark:text-fuchsia-300';
            case 'pink':
                return 'text-pink-700 dark:text-pink-300';
            default:
                return 'text-black dark:text-white';
        }
    }

    getBgColor(cor: string): string {
        // tailwind não reconhece concatenações tipo 'text-' + cor + '-500'
        switch (cor) {
            case 'red':
                return 'bg-red-300 dark:bg-red-800';
            case 'green':
                return 'bg-green-300 dark:bg-green-800';
            case 'blue':
                return 'bg-blue-300 dark:bg-blue-800';
            case 'purple':
                return 'bg-purple-300 dark:bg-purple-800';
            case 'amber':
                return 'bg-amber-300 dark:bg-amber-800';
            case 'cyan':
                return 'bg-cyan-300 dark:bg-cyan-800';
            case 'fuchsia':
                return 'bg-fuchsia-300 dark:bg-fuchsia-800';
            case 'pink':
                return 'bg-pink-300 dark:bg-pink-800';
            default:
                return 'bg-gray';
        }
    }

    getLightBgColor(cor: string): string {
        // tailwind não reconhece concatenações tipo 'text-' + cor + '-500'
        switch (cor) {
            case 'red':
                return 'bg-red-100/20 dark:bg-red-900';
            case 'green':
                return 'bg-green-100/20 dark:bg-green-900';
            case 'blue':
                return 'bg-blue-100/20 dark:bg-blue-900';
            case 'purple':
                return 'bg-purple-100/20 dark:bg-purple-900';
            case 'amber':
                return 'bg-amber-100/20 dark:bg-amber-900';
            case 'yellow':
                return 'bg-yellow-100/20 dark:bg-yellow-950/20';
            case 'cyan':
                return 'bg-cyan-100/20 dark:bg-cyan-900';
            case 'fuchsia':
                return 'bg-fuchsia-100/20 dark:bg-fuchsia-900';
            case 'pink':
                return 'bg-pink-100/20 dark:bg-pink-900';
            default:
                return 'bg-gray';
        }
    }
}
