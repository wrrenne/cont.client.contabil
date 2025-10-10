import { ObrigacoesStat } from "..";

export interface ObrigacaoClientePeriodoUserPageItem {
    userId: number;
    userNome: string;
    userNomeFormat: string;
    clienteId: number;
    departamentoId: number;
    departamentoNome: string;
    obrigacoesStat: ObrigacoesStat;
}
