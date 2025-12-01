import { WidgetBase } from 'src/app/shared/models';
import { ObrigacoesStat } from '../obrigacoes';

export interface WidgetDepartamento extends WidgetBase {
    departamentoId: number;
    departamentoNome: string;
    users: WidgetDepartamentoUser[];
}

export interface WidgetDepartamentoUser {
    userId: number;
    userNome: string;
    userNomeFormat: string;
    obrigacoesStat: ObrigacoesStat;
}
