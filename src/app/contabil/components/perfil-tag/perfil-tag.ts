import { Component, Input } from '@angular/core';

@Component({
    selector: 'perfil-tag',
    templateUrl: './perfil-tag.html',
    standalone: true,
})
export class PerfilTagComponent {
    @Input() perfil?: string;
    @Input() regime?: string;
    // private _regime: string | undefined;
    // @Input() get regime() {
    //     return this._regime;
    // }
    // set regime(value: string | undefined) {
    //     this._regime = value;
    // }

    getClass(): string {
        if (this.regime) {
            return this.regime != 'Regime Indefinido' ? 'text-amber-700 dark:text-amber-500' : 'text-zinc-500';
            // return this.regime != 'Regime Indefinido' ? 'tag-amber' : 'tag-silver-outline';
        }

        return 'text-zinc-500';
        // return 'tag-silver-outline';
    }

    // getClass(): string {
    //     switch (this.perfil) {
    //         case 'Lucro Presumido':
    //             return 'tag-blue';
    //         case 'Lucro Real':
    //             return 'tag-green';
    //         case 'Autônomo':
    //             return 'tag-sky';
    //         case 'MEI':
    //             return 'tag-yellow';
    //         case 'Simples':
    //             return 'tag-red';

    //         case 'Comércio':
    //             return this.getPerfilSecundarioClass();
    //         case 'Serviço':
    //             return this.getPerfilSecundarioClass();
    //         case 'Indústria':
    //             return this.getPerfilSecundarioClass();
    //     }

    //     return 'tag-muted-outline';
    // }

    getPerfilSecundarioClass(): string {
        switch (this.regime) {
            case 'Lucro Presumido':
                return 'tag-blue-outline';
            case 'Lucro Real':
                return 'tag-green-outline';
            case 'Autônomo':
                return 'tag-sky-outline';
            case 'MEI':
                return 'tag-yellow-outline';
            case 'Simples':
                return 'tag-red-outline';
        }

        return '';
    }
}
