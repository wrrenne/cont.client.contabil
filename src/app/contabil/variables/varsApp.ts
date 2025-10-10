import { Injectable } from '@angular/core';
import { Vars } from '../../shared/variables/vars';

@Injectable()
export class VarsApp extends Vars {

    constructor() {
        super()
    }

    get sidebarConfig(): string[] {
        const value: string | null = localStorage.getItem(this.getVarName('sidebar'));

        return value != null ? value.split(',') : ['pessoal', 'apontamento']
    }
    set sidebarConfig(value: string[]) {
        localStorage.setItem(this.getVarName('sidebar'), value.join(','))
    }
}
