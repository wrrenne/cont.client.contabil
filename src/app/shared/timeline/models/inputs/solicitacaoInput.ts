import { TSolicitacaoTipo } from "../../enums";

export interface SolicitacaoTratamentoInput {
    cadastroId: number;
    userId: number;
    funcionarioId: number;
    origemId?: number;
    postId?: number;
    solicitacaoTipo: TSolicitacaoTipo;
    texto: string;
    entrada?: boolean;
    intervalo?: boolean;
    saida?: boolean;
    entradaValor?: number;
    intervaloValor?: number;
    saidaValor?: number;
    classificacaoId?: number;
    apontamentoId?: number;
    apontamentoData?: string;
}
