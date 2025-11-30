import { ObrigacoesStat } from '../obrigacoes';

export interface WidgetObrigacoesAtrasadas {
    clientes?: WidgetObrigacoesAtrasadasCliente[];
    obrigacoes?: WidgetObrigacoesAtrasadasObrigacao[];
    total: number;
    seeMoreCount: number;
}

export interface WidgetObrigacoesAtrasadasCliente {
    clienteId: number;
    clienteNome: string;
    obrigacoesStat: ObrigacoesStat;
}

export interface WidgetObrigacoesAtrasadasObrigacao {
    obrigacaoId: number;
    obrigacaoNome: string;
    obrigacoesStat: ObrigacoesStat;
}
