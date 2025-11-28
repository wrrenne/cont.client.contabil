import { ObrigacoesStat } from '../obrigacoes';

export interface WidgetObrigacoesEntregues {
    mes: Date;
    obrigacoesStat: ObrigacoesStat;
    departamentos: WidgetObrigacoesEntreguesDepartamento[];
}

export interface WidgetObrigacoesEntreguesDepartamento {
    departamentoId: number;
    departamentoNome: string;
    obrigacoesStat: ObrigacoesStat;
}
