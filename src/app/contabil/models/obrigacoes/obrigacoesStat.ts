export interface ObrigacoesStat {
    clienteId?: number;
    obrigacaoId?: number;
    userId?: number;
    concluidasNoPrazo: number;
    concluidasForaDoPrazo: number;
    concluidas: number;
    emAtraso: number;
    emAberto: number;
    total: number;
    concluidoPorcento: number;
    concluidoNoPrazoPorcento: number;
    concluidasForaDoPrazoPorcento: number;
    emAtrasoPorcento: number;
    emAbertoPorcento: number;
    nota?: number;
    clientesCount?: number;
    obrigacoesCount?: number;
}
