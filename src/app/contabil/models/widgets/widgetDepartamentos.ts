import { ObrigacoesStat } from '../obrigacoes';

export interface WidgetDepartamento {
    departamentoId: number;
    departamentoNome: string;
    users: WidgetDepartamentoUser[];
}

export interface WidgetDepartamentoUser {
    userId: number;
    userNome: string;
    obrigacoesStat: ObrigacoesStat;
}
