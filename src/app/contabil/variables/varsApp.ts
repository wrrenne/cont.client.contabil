import { Injectable, Injector } from '@angular/core';
import { Vars } from '../../shared/variables/vars';

@Injectable()
export class VarsApp extends Vars {
    constructor(injector: Injector) {
        super(injector);
    }

    get sidebarConfig(): string[] {
        const value: string | null = localStorage.getItem(this.getVarName('sidebar'));

        return value != null ? value.split(',') : ['gestao', 'controle_obrigacoes', 'tabelas'];
    }
    set sidebarConfig(value: string[]) {
        localStorage.setItem(this.getVarName('sidebar'), value.join(','));
    }
}
